import React, { useState, CSSProperties, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContractPromise } from "@polkadot/api-contract";
import { WeightV2 } from "@polkadot/types/interfaces";
import { BN } from "@polkadot/util";
import { useWallets } from "@/contexts/Wallets";
import contractAbi from "@/contracts/album/albums.json";
import { useApi } from "@/hooks/useApi";
import configureAWS from "@/utils/ipfs/awsConfig";
import { v4 as uuidv4 } from "uuid";
import S3 from "aws-sdk/clients/s3";
import axios from "axios";
import Link from "next/link";
import CircleLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/router";
import { useAlbumContract } from "@/hooks/useAlbumContract";

type SongMetadataType = {
  title: string;
  price: string;
  maxSupply: string;
  image: string;
  sound: string;
};

type CreateSongInput = {
  title: string;
  price: string;
  maxSupply: string;
  image: File;
}

type Props = {
  onSubmit: (input: CreateSongInput) => void;
}

const CreateSongForm = ({ onSubmit }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [maxSupply, setCurrentSoundMaxSupply] = useState<string>("");
  const [selectedSound, setSelectedSound] = useState<File>();
  const [selectedImage, setSelectedImage] = useState<File>();
  const [showSongs, setShowSongs] = useState(false);
  const [songMetaData, setSongMetaData] = useState<SongMetadataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSoundImageChange = (e: any) => {
    e.preventDefault();
    setSelectedImage(e.target.files[0]);
  };

  const handleSoundChange = (e: any) => {
    e.preventDefault();
    console.log("handleSoundChange", e.target.files[0]);
    setSelectedSound(e.target.files[0]);
  };

  const validateSoundFields = () => {
    if (!title) {
      toastFunction("Please provide a title");
      return false;
    }
    if (!price) {
      toastFunction("Please provide a price");
      return false;
    }
    if (!selectedSound) {
      toastFunction("Please provide a sound");
      return false;
    }
    if (!selectedImage) {
      toastFunction("Please provide an image");
      return false;
    }
    return true;
  };

  const emptySoundFields = () => {
    setPrice("");
    setTitle("");
    setSelectedImage(undefined);
    setSelectedSound(undefined);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateSoundFields()) {
      return;
    }

    onSubmit({
      title,
      price,
      maxSupply,
      image: selectedImage,
    } as CreateSongInput);
  };

  const fetchSongsFromStorage = async () => {
    const storageAlbumsData = localStorage.getItem("albums");
    const storageAlbums = storageAlbumsData
      ? JSON.parse(storageAlbumsData)
      : [];
    console.log("fetchSongsFromStorage");
    if (storageAlbums.length && showSongs) {
      const albumMetaData = (
        await Promise.all(
          storageAlbums[storageAlbums.length - 1].songs.map(
            async (song: string) => {
              const axiosConfig = {
                method: "get",
                url: `https://ipfs.io/ipfs/${song}`,
                headers: {
                  accept: "application/json",
                  "Content-Type": "application/json",
                },
              };

              try {
                const { data } = await axios(axiosConfig);
                return data;
              } catch (error) {
                console.error(error);
                return null;
              }
            }
          )
        )
      ).filter((data) => data !== null);
      console.log({ albumMetaData });
      setSongMetaData(albumMetaData);
    }
  };

  const removeSongs = async (id: number) => {
    const storageAlbumsData = localStorage.getItem("albums");
    const storageAlbums = storageAlbumsData
      ? JSON.parse(storageAlbumsData)
      : [];
    console.log("fetchSongsFromStorage");
    storageAlbums[storageAlbums.length - 1].songs.splice(id, 1);
    localStorage.setItem("albums", JSON.stringify(storageAlbums));
    await fetchSongsFromStorage();
    toastFunction(`Deleted Song SuccessFully`);
  };

  const toastFunction = (string: any) => {
    toast.info(string, { position: toast.POSITION.TOP_RIGHT });
  };

  return (
    <div className="mt-3" style={{ borderTop: "1px solid" }}>
      <h2 className="mt-3">Songs</h2>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="">
            <div>
              <h5>Title</h5>
              <input
                type="text"
                placeholder="Enter Title..."
                value={title ? title : ""}
                onChange={(e: any) =>
                  setTitle(e.target.value)
                }
              />
            </div>
            <div className="mt-3">
              <h5>Upload soundtrack</h5>
              <input
                id="files"
                type="file"
                placeholder="Upload SoundTrack"
                accept=".mp3, .mp4, .wav|audio/*,video/*"
                onChange={(e) => handleSoundChange(e)}
              />
            </div>
            <div className="mt-3">
              <h5>MaxSupply</h5>
              <input
                type="text"
                placeholder="Press 0 if no maximum"
                value={
                  maxSupply ? maxSupply : ""
                }
                onChange={(e: any) =>
                  setCurrentSoundMaxSupply(e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <h5>Price</h5>
          <div className="" style={{ alignItems: "center" }}>
            <div className="d-flex">
              <input
                type="text"
                placeholder="Enter Price..."
                value={price ? price : ""}
                onChange={(e: any) =>
                  setPrice(e.target.value)
                }
              />
              <span className="ms-3">AFT</span>
            </div>
            <div className="mt-3">
              <h5>Upload image</h5>
              <input
                type="file"
                placeholder="Upload Image"
                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                onChange={handleSoundImageChange}
              />
            </div>
            <div className="mt-3">
              <button
                className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen mt-3"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Add Song
              </button>
            </div>
          </div>
        </div>
      </div>
      {songMetaData.length > 0 ? (
        <div className="mb-5">
          <div className="row">
            <div className="col-sm-12 col-md-9">
              <div className="mt-5 table-responsive">
                <table className="table table-hover table-success table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col">MaxSupply</th>
                      <th scope="col">Price</th>
                      <th scope="col">Created On</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {songMetaData.map(
                      (song: SongMetadataType, index: number) => (
                        <tr key={index}>
                          <td scope="row">{song.title}</td>
                          <td>
                            <img
                              src={song.image}
                              alt=""
                              style={{
                                width: "60px",
                                height: "60px",
                              }}
                            />
                          </td>
                          <td>
                            <audio controls>
                              <source
                                src={song.sound}
                                type="audio/mpeg"
                              />
                              Your browser does not support the audio
                              element.
                            </audio>
                          </td>
                          <td>{song.maxSupply}</td>
                          <td>{song.price}</td>
                          <td>09:35 11/02/2023</td>
                          <td>
                            <button
                              className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
                              onClick={(e) => removeSongs(index)}
                              disabled={isLoading}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CreateSongForm;
