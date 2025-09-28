"use client"

import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Metaplex, keypairIdentity, toMetaplexFile } from "@metaplex-foundation/js"

export type CertificateMetadata = {
	title: string
	description: string
	skill: string
	level: string
	issuer: string
	imageUrl?: string
}

export class SkillCertificateMinter {
	private metaplex: Metaplex

	constructor(privateKey?: Uint8Array) {
		// For dev: allow optional signer injection; otherwise wallet adapter should sign
		const dummy = Keypair.generate()
		this.metaplex = Metaplex.make({} as any).use(keypairIdentity(dummy))
	}

	async mintCertificate(args: {
		connection: ReturnType<typeof useConnection>["connection"]
		payerPublicKey: PublicKey
		metadata: CertificateMetadata
		storageUpload?: (data: Blob | Buffer, fileName: string) => Promise<string>
	}) {
		const { connection, payerPublicKey, metadata, storageUpload } = args

		// Minimal placeholder using Metaplex to mint 1 NFT with provided metadata URI
		// In production, upload JSON to Arweave/IPFS and reference the URI
		const metadataJson = {
			name: metadata.title,
			symbol: "SKILL",
			description: metadata.description,
			image: metadata.imageUrl ?? "https://placehold.co/600x400",
			attributes: [
				{ trait_type: "skill", value: metadata.skill },
				{ trait_type: "level", value: metadata.level },
				{ trait_type: "issuer", value: metadata.issuer },
			],
		}

		let uri = ""
		if (storageUpload) {
			const blob = new Blob([JSON.stringify(metadataJson)], { type: "application/json" })
			uri = await storageUpload(blob, `skill-cert-${Date.now()}.json`)
		} else {
			// For dev, hostless: use data URI (not ideal); wallets/marketplaces may not index
			uri = `data:application/json,${encodeURIComponent(JSON.stringify(metadataJson))}`
		}

		const { nft } = await this.metaplex.nfts().create({
			uri,
			name: metadata.title,
			sellerFeeBasisPoints: 0,
			isMutable: true,
			symbol: "SKILL",
			tokenOwner: payerPublicKey,
			maxSupply: 1,
		})

		return nft
	}
}


