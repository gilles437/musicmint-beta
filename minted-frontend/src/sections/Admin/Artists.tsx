import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { beatifyAddress } from '@/utils/account';
import Identicon from '@polkadot/react-identicon';
import { Artist, useSelector, useDispatch, fetchArtistListAsync } from '@/lib/redux';
import { useWallets } from '@/contexts/Wallets';
import { useFindAddress } from '@/hooks/useFindAddress';
import { useDeployArtistContract } from '@/hooks/contract/useDeployArtistContract';
import { useAddArtist } from '@/hooks/contract/useAddArtist';
import { useRemoveArtist } from '@/hooks/contract/useRemoveArtist';

const ArtistsSection = () => {
  const dispatch = useDispatch();
  const { walletAddress } = useWallets();
  const { superAdmins, artists: artistList } = useSelector((state) => state.admin);
  const [newAdminInput, setNewAdminInput] = useState<string>('');
  const addArtist = useAddArtist();
  const removeArtist = useRemoveArtist();
  const deployContract = useDeployArtistContract();
  const findAddress = useFindAddress();

  //TODO - create a hook
  const fetchArtistList = useCallback(() => {
    dispatch(fetchArtistListAsync());
  }, [dispatch]);

  useEffect(() => {
    fetchArtistList();
  }, [fetchArtistList]);

  const isSuperAdmin = useMemo(() => {
    // Check if it is super admin.
    return !!superAdmins.some((i) => i.to === walletAddress);
  }, [superAdmins, walletAddress]);

  const addAdmin = async (newContractAddress: string) => {
    console.log('addAdmin', newContractAddress);
    if (!newAdminInput) {
      toast.warn('Please input address');
      return;
    }

    if (!newContractAddress) {
      toast.warn('Please contract address');
      return;
    }

    try {
      const success = await addArtist(newAdminInput, newContractAddress);
      if (success) {
        toast.success('Artist has been successfully added');
        setNewAdminInput('');
        
        const timerId = setTimeout(() => fetchArtistList(), 5000);
        return () => clearTimeout(timerId);
      }
    } catch (err: any) {
      if (err && err.message === 'Cancelled') {
        toast.error(`Transaction cancelled`);
        return false;
      }
    }

    toast.error(`Something went wrong!`);
    return false;
  };

  const removeAdmin = async (artistAddress: string) => {
    if (!artistAddress) {
      toast.warn('Please input address');
      return;
    }

    // Check if it is super admin.
    if (!isSuperAdmin) {
      toast.warn('Current selected account is not SuperAdmin !');
      return;
    }

    const artist = artistList.find((i) => i.to == artistAddress);
    if (!artist) {
      toast.warn('Invalid address!');
      return;
    }

    try {
      const success = await removeArtist(artist.to, artist.contract);
      if (success) {
        toast.success('Artist has been successfully removed');
        setNewAdminInput('');
        const timerId = setTimeout(() => fetchArtistList(), 5000);
        return () => clearTimeout(timerId);
      }
    } catch (err: any) {
      if (err && err.message === 'Cancelled') {
        toast.error(`Transaction cancelled`);
        return false;
      }
    }

    toast.error(`Something went wrong!`);
    return false;
  };

  const handleAddAdminChange = (event: any) => {
    setNewAdminInput(event.target.value);
  };

  const deployAdminContract = async () => {
    if (!newAdminInput) {
      toast.warn('You should input address!');
      return;
    }

    // Check if it is super admin.
    if (!isSuperAdmin) {
      toast.warn('Current selected account is not SuperAdmin!');
      return;
    }

    if (findAddress(newAdminInput)) {
      toast.warn('Account is already added !');
      return;
    }

    console.log(`start deploy contract`, newAdminInput);
    const deployed = await deployContract(newAdminInput);
    addAdmin(deployed);
  };

  return (
    <div className="mb-5">
      <h2 className="mt-3">Artists Section</h2>
      <div className="row mt-3">
        <div className="col-sm-6">
          <input
            type="text"
            placeholder="Enter Address..."
            onChange={handleAddAdminChange}
            value={newAdminInput}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="col-sm-6" style={{ alignItems: 'flex-end', display: 'flex' }}>
          <button
            onClick={(e) => deployAdminContract()}
            className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
          >
            Add Artist
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-12">
          <div className="mt-5 table-responsive">
            <table className="table table-hover table-success table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Address</th>
                  <th scope="col">Contract Address</th>
                  <th scope="col">Created On</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {artistList.map((adminAccount: Artist, index: number) => (
                  <tr key={index}>
                    <th scope="row">
                      {!!adminAccount.to && (
                        <div className="d-flex">
                          <p className="ps-1">{beatifyAddress(adminAccount.to)}</p>
                          <Identicon
                            value={adminAccount.to}
                            size={32}
                            theme="polkadot"
                            className="pe-1"
                          />
                        </div>
                      )}
                    </th>
                    <th scope="row">
                      {!!adminAccount.contract && (
                        <div className="d-flex">
                          <p className="ps-1">{beatifyAddress(adminAccount.contract)}</p>
                          <Identicon
                            value={adminAccount.contract}
                            size={32}
                            theme="polkadot"
                            className="pe-1"
                          />
                        </div>
                      )}
                    </th>
                    <td>
                      {adminAccount.timestamp
                        ? dayjs(adminAccount.timestamp).format('MM/DD/YYYY HH:mm')
                        : ''}
                    </td>
                    <td>
                      <button
                        onClick={(e) => removeAdmin(adminAccount.to)}
                        className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
                      >
                        Remove Artist
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistsSection;
