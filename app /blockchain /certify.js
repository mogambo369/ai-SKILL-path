import { Gateway, Wallets } from "fabric-network";
import path from "path";
import fs from "fs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });
  const { userId, courseId, timestamp } = req.body;

  try {
    //loading 
    const ccpPath = path.resolve(process.cwd(), 'connection-org1.json'); 
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    const wallet = await Wallets.newFileSystemWallet('./wallet');
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('skillcert');
    await contract.submitTransaction('Certify', userId, courseId, timestamp);

    await gateway.disconnect();
    res.status(200).json({ success: true, message: "Certification recorded on blockchain" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
