"use client"

import { CertificateMintForm } from "@/components/solana/certificate-mint-form"
import { CertificateGallery } from "@/components/solana/certificate-gallery"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CertificatesPage() {
	return (
		<div className="container mx-auto px-4 py-8 space-y-8">
			<div className="space-y-2">
				<h1 className="text-3xl font-bold">Blockchain Certificates</h1>
				<p className="text-muted-foreground">Mint skill certificates as NFTs and verify them on Solana.</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>How it works</CardTitle>
					<CardDescription>
						- Connect a wallet
						- Fill in skill details
						- Mint a 1-of-1 NFT with on-chain metadata
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						Your certificate is minted to your wallet. You can view it in the gallery and on the Solana Explorer.
					</p>
				</CardContent>
			</Card>

			<CertificateMintForm />

			<div className="space-y-2">
				<h2 className="text-xl font-semibold">Your Certificates</h2>
				<CertificateGallery />
			</div>
		</div>
	)
}


