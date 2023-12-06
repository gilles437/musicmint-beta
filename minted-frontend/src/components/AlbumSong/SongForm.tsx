import React, { useState } from 'react';
import { toast } from 'react-toastify';

export type CreateSongInput = {
  title: string;
  price: string;
  maxSupply: string;
  image: File;
  sound: File;
};

type Props = {
  onSubmit: (input: CreateSongInput) => Promise<boolean>;
};

const toastFunction = (string: any) => {
  toast.info(string, { position: toast.POSITION.TOP_RIGHT });
};

const SongForm = ({ onSubmit }: Props) => {
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [maxSupply, setCurrentSoundMaxSupply] = useState<string>('');
  const [selectedSound, setSelectedSound] = useState<File>();
  const [selectedImage, setSelectedImage] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: any) => {
    e.preventDefault();
    setSelectedImage(e.target.files[0]);
  };

  const handleSoundChange = (e: any) => {
    e.preventDefault();
    console.log('handleSoundChange', e.target.files[0]);
    setSelectedSound(e.target.files[0]);
  };

  const validateSoundFields = () => {
    if (!title) {
      toastFunction('Please provide a title');
      return false;
    }
    if (!price) {
      toastFunction('Please provide a price');
      return false;
    }
    if (!selectedSound) {
      toastFunction('Please provide a sound');
      return false;
    }
    if (!selectedImage) {
      toastFunction('Please provide an image');
      return false;
    }
    return true;
  };

  const emptySoundFields = () => {
    setPrice('');
    setTitle('');
    setSelectedImage(undefined);
    setSelectedSound(undefined);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateSoundFields()) {
      return;
    }

    const input: CreateSongInput = {
      title,
      price,
      maxSupply,
      image: selectedImage!,
      sound: selectedSound!,
    };
    onSubmit(input).then((success) => {
      success && emptySoundFields();
    });
  };

  return (
    <div className="mt-3" style={{ borderTop: '1px solid' }}>
      <div className="text-center mb-3 pb-3">
        <h2 className="mt-3">Add Song</h2>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="">
            <div>
              <h5>Title</h5>
              <input
                type="text"
                placeholder="Enter Title..."
                value={title ? title : ''}
                onChange={(e: any) => setTitle(e.target.value)}
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
                value={maxSupply ? maxSupply : ''}
                onChange={(e: any) => setCurrentSoundMaxSupply(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <h5>Price</h5>
          <div className="" style={{ alignItems: 'center' }}>
            <div className="d-flex">
              <input
                type="text"
                placeholder="Enter Price..."
                value={price ? price : ''}
                onChange={(e: any) => setPrice(e.target.value)}
              />
              <span className="ms-3">AFT</span>
            </div>
            <div className="mt-3">
              <h5>Upload image</h5>
              <input
                type="file"
                placeholder="Upload Image"
                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                onChange={handleImageChange}
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
    </div>
  );
};

export default SongForm;
