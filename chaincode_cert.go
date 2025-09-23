package main

import (
    "encoding/json"
    "fmt"
    "github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type SmartContract struct {
    contractapi.Contract
}

type SkillCertificate struct {
    UserID    string `json:"userId"`
    CourseID  string `json:"courseId"`
    Timestamp string `json:"timestamp"`
}

func (s *SmartContract) Certify(ctx contractapi.TransactionContextInterface, userId string, courseId string, timestamp string) error {
    cert := SkillCertificate{UserID: userId, CourseID: courseId, Timestamp: timestamp}
    certAsBytes, _ := json.Marshal(cert)
    key := fmt.Sprintf("%s_%s", userId, courseId)
    return ctx.GetStub().PutState(key, certAsBytes)
}


func (s *SmartContract) GetCertificate(ctx contractapi.TransactionContextInterface, userId string, courseId string) (*SkillCertificate, error) {
    key := fmt.Sprintf("%s_%s", userId, courseId)
    certAsBytes, err := ctx.GetStub().GetState(key)
    if err != nil || certAsBytes == nil {
        return nil, fmt.Errorf("Certificate does not exist")
    }
    cert := new(SkillCertificate)
    _ = json.Unmarshal(certAsBytes, cert)
    return cert, nil
}

func main() {
    chaincode, err := contractapi.NewChaincode(new(SmartContract))
    if err != nil {
        panic(err.Error())
    }
    if err := chaincode.Start(); err != nil {
        panic(err.Error())
    }
}
