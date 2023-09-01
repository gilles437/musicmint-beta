import { useState, useEffect } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import contractAbi from "./artist_identity.json"; // Replace by your contract ABI
import { BN } from "@polkadot/util";

const ContractGetter = () => {
    const [isVerified, setArtistVerifiedState] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchIsVerifiedArtist() {
            setIsLoading(true); 

            // 1. Connection to the chain
            const wsProvider = new WsProvider('wss://rpc-test.allfeat.io');
            const api = await ApiPromise.create({ provider: wsProvider });
          
            // 2. Contract Instantiation
            const contractAddress = '5EsxYtnUYLef4CRM2cmLmwmV4DtPzJp7rNRRQPYjW2vELNpQ';  // Replace the address of your contract
            const contract = new ContractPromise(api, contractAbi, contractAddress);

            // 3. Definition of the call arguments
            const caller = "5ExwQhzvCXEaAzmKruwq1ZRkn3sgRaWEaseAjBWrv2QDDBmH"; 
            const accountId = '5HfxDv7pvFmVguyu4FvbjJ7wktUvp1e7Q2XSpSmokj6HzaL3'; // Replace by your function argument
            const gasLimit = api.registry.createType("WeightV2", {
                refTime: new BN("10000000000"),
                proofSize: new BN("10000000000"),
            });

            // if null is passed, unlimited balance can be used
            const storageDepositLimit = null

            // 4. Call of the contract's function
            const { result, output } = await contract.query.isVerifiedArtist(caller, {value: 0, gasLimit, storageDepositLimit}, accountId);

            if (result.isOk) {
              return output?.toHuman(); // Return the result of the function
            } else {
              throw new Error('Error during contract call');
            }
        }
    
        fetchIsVerifiedArtist()
        .then(result => {
            setArtistVerifiedState(result.Ok);
            setIsLoading(false); 
            console.log(result);
        })
        .catch(console.error);
    }, [])

  

    // In this case, we are waiting for a bool response from the contract
    return (
        <div>   
            <h1>{isLoading && "Loading..."}</h1>
            <h1>{!isLoading  && isVerified && "Artist is verified"}</h1> 
            <h1>{!isLoading  && !isVerified && "Artist is not verified"}</h1>
        </div>
    )
}

export default ContractGetter; 
