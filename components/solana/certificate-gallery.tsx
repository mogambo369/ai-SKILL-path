"use client"

import { useEffect, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type NftItem = {
	mint: string
	name: string
	image?: string
	uri?: string
}

export function CertificateGallery() {
	const { publicKey } = useWallet()
	const [items, setItems] = useState<NftItem[]>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		async function fetchNfts() {
			if (!publicKey) return
			setLoading(true)
			try {
				// Placeholder: integrate Metaplex or Helius to fetch NFTs by owner
				setItems([])
			} finally {
				setLoading(false)
			}
		}
		fetchNfts()
	}, [publicKey])

	if (!publicKey) {
		return <p className="text-sm text-muted-foreground">Connect a wallet to view certificates.</p>
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{loading && <p>Loading...</p>}
			{!loading && items.length === 0 && <p className="text-sm text-muted-foreground">No certificates found for this wallet.</p>}
			{items.map((nft) => (
				<Card key={nft.mint}>
					<CardHeader>
						<CardTitle className="text-base">{nft.name}</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						{nft.image && (
							<img src={nft.image} alt={nft.name} className="w-full h-40 object-cover rounded" />
						)}
						<div className="flex items-center gap-3">
							<a className="text-primary underline" href={`https://explorer.solana.com/address/${nft.mint}?cluster=devnet`} target="_blank" rel="noreferrer">
								View on Explorer
							</a>
							{nft.uri && (
								<a className="text-muted-foreground underline" href={nft.uri} target="_blank" rel="noreferrer">
									Metadata
								</a>
							)}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	)
}

export default CertificateGallery


