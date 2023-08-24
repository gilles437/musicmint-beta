import { useState, useEffect, useRef } from 'react';
import CountTo from '../../CountTo';
import axios from 'axios';

const CareerForm = () => {
  const numbersSectionRef = useRef(null);

  const [formData, setFormdata] = useState({
    fullname: "",
    email: "",
    phone: "",
    cv_file: {},
    coverletter: ""
  });

  const [position, setPosition] = useState({ from: 2500, to: 3000 });

  useEffect(() => {
    if (numbersSectionRef) {
      const top = numbersSectionRef.current.offsetTop;
      const height = numbersSectionRef.current.offsetHeight;

      setPosition({ from: top - height, to: top + height });
    }
  }, [numbersSectionRef]);

  const handleFormChange = (e) => {
    // setFormdata(prev => ({
    //   ...prev,
    //   [e.target.name]: e.target.value
    // }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // const formValues = new FormData();

    // formValues.append('name', formData.name);
    // formValues.append('email', formData.email);
    // formValues.append('phone', formData.phone);
    // formValues.append('cv_file', formData.cv_file.files[0]);
    // formValues.append('message', formData.message);
    
    // const res = await axios.post('/contact.php', formValues)
    //   .catch(err => alert(err.message));

    // if (!res) return;

    alert('Form submitted successfully.')
  }

  return (
    <section className="career-form section-padding" ref={numbersSectionRef}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="form-numbers">
              <h2> Looking For Oppertunity </h2>
              <p> More than 15,000 companies trust and choose Itech </p>
              <div className="career-numbers mt-50">
                <div className="row gx-5">
                  <div className="col-5">
                    <div className="mum-card">
                      <h3> <CountTo className="counter" from={0} to={5000} speed={1500} position={position} /> </h3>
                      <small> Project Completed </small>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="mum-card">
                      <h3> <CountTo className="counter" from={0} to={1} speed={1500} position={position} /> M+ </h3>
                      <small> Happy Users </small>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="mum-card">
                      <h3> <CountTo className="counter" from={0} to={100} speed={1500} position={position} /> </h3>
                      <small> Team Members </small>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="mum-card">
                      <h3> <CountTo className="counter" from={0} to={10} speed={1500} position={position} /> </h3>
                      <small> Offline Basement </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <form action="contact.php" className="form">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group mb-4">
                    <input type="text" className="form-control" placeholder="Full Name" onChange={handleFormChange} />
                    <span className="icon"> <i className="fas fa-user"></i> </span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-4">
                    <input type="text" className="form-control" placeholder="Email Adress" onChange={handleFormChange} />
                    <span className="icon"> <i className="fas fa-envelope"></i> </span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-4">
                    <input type="text" className="form-control" placeholder="Phone Number" onChange={handleFormChange} />
                    <span className="icon"> <i className="fas fa-phone"></i> </span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-4 upload-card">
                    <div className="form-control">
                      <span id="upload_text"> <i className="fas fa-cloud"></i> Upload CV</span>
                      <input type="file" className="upload_input" onChange={handleFormChange} />
                    </div>

                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-4">
                    <textarea rows="7" className="form-control" placeholder="Cover letter" onChange={handleFormChange}></textarea>
                    <span className="icon"> <i className="fas fa-pen"></i> </span>
                  </div>
                </div>
              </div>
              <button className="btn bg-white sm-butn mt-4 rounded-3" onClick={handleFormSubmit}>
                <span className="text-dark"> Make Request <i className="fal fa-long-arrow-right ms-2 color-blue5"></i> </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <img src="/assets/img/careers/map.png" alt="" className="map_img" />
    </section>
  )
}

export default CareerForm