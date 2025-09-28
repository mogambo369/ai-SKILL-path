"use client"

import { useState } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { PublicKey } from "@solana/web3.js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SkillCertificateMinter } from "@/lib/solana/certificate-minter"

export function CertificateMintForm() {
	const { connection } = useConnection()
	const { publicKey } = useWallet()
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [skill, setSkill] = useState("")
	const [level, setLevel] = useState("")
	const [issuer, setIssuer] = useState("SkillPath AI")
	const [txStatus, setTxStatus] = useState<string | null>(null)
	const [mintAddress, setMintAddress] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	async function onMint() {
		if (!publicKey) {
			setTxStatus("Connect a wallet first")
			return
		}
		setIsLoading(true)
		setTxStatus("Minting certificate...")
		try {
			const minter = new SkillCertificateMinter()
			const nft = await minter.mintCertificate({
				connection,
				payerPublicKey: publicKey as PublicKey,
				metadata: { title, description, skill, level, issuer },
			})
			setMintAddress(nft.address.toBase58())
			setTxStatus("Success: Certificate minted")
		} catch (e: any) {
			setTxStatus(`Error: ${e.message ?? String(e)}`)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Mint Skill Certificate</CardTitle>
				<CardDescription>Create a blockchain-verified certificate as an NFT</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<Label htmlFor="title">Title</Label>
						<Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Full Stack Developer Certificate" />
					</div>
					<div>
						<Label htmlFor="skill">Skill</Label>
						<Input id="skill" value={skill} onChange={(e) => setSkill(e.target.value)} placeholder="React.js" />
					</div>
					<div>
						<Label htmlFor="level">Level</Label>
						<Input id="level" value={level} onChange={(e) => setLevel(e.target.value)} placeholder="Intermediate" />
					</div>
					<div>
						<Label htmlFor="issuer">Issuer</Label>
						<Input id="issuer" value={issuer} onChange={(e) => setIssuer(e.target.value)} />
					</div>
				</div>
				<div>
					<Label htmlFor="description">Description</Label>
					<Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Awarded for completing the React specialization." />
				</div>
				<div className="flex items-center gap-3">
					<Button onClick={onMint} disabled={isLoading}>
						{isLoading ? "Minting..." : "Mint Certificate"}
					</Button>
					{mintAddress && (
						<a className="text-primary underline" href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`} target="_blank" rel="noreferrer">
							View on Explorer
						</a>
					)}
				</div>
				{txStatus && <p className="text-sm text-muted-foreground">{txStatus}</p>}
			</CardContent>
		</Card>
	)
}

export default CertificateMintForm


