"use client"

import { ReactNode, useEffect, useMemo } from "react"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import {
	PhantomWalletAdapter,
	SolflareWalletAdapter,
	TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css"

type SolanaWalletProviderProps = {
	children: ReactNode
	/** Override network via env or prop; defaults to devnet */
	network?: WalletAdapterNetwork
	endpoint?: string
}

export function SolanaWalletProvider({ children, network, endpoint }: SolanaWalletProviderProps) {
	const resolvedNetwork = network ?? (process.env.NEXT_PUBLIC_SOLANA_NETWORK as WalletAdapterNetwork) ?? WalletAdapterNetwork.Devnet
	const resolvedEndpoint = endpoint ?? process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT ?? clusterApiUrl(resolvedNetwork)

	const wallets = useMemo(
		() => [
			new PhantomWalletAdapter(),
			new SolflareWalletAdapter({ network: resolvedNetwork }),
			new TorusWalletAdapter(),
		],
		[resolvedNetwork]
	)

	// Preload wallet modal styles to avoid FOUC
	useEffect(() => {
		// no-op, import above handles styles
	}, [])

	return (
		<ConnectionProvider endpoint={resolvedEndpoint}>
			<WalletProvider wallets={wallets} autoConnect>
				<WalletModalProvider>{children}</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	)
}

export default SolanaWalletProvider


