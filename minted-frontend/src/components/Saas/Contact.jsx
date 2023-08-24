import { useState } from 'react';
import axios from 'axios';

const Contact = ({ rtl }) => {
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    option: "",
    message: ""
  });

  const handleFormChange = (e) => {
    setFormdata(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formValues = new FormData();

    formValues.append('name', formData.name);
    formValues.append('email', formData.email);
    formValues.append('phone', formData.phone);
    formValues.append('website', formData.website);
    formValues.append('option', formData.option);
    formValues.append('message', formData.message);
    
    const res = await axios.post('/contact.php', formValues)
      .catch(err => alert(err.message));

    if (!res) return;

    alert('Form submitted successfully.')
  }

  return (
    <section className="contact section-padding border-bottom border-1 brd-gray style-6">
      <div className="container">
        <div className="section-head text-center mb-70 style-5">
          <h2 className="mb-20">{ rtl ? 'احصل على ' : 'Ready To Start A' } <span>{ rtl ? 'استشارة مجانية' : 'Projects' }</span> </h2>
          <p>{ rtl ? 'سنتواصل معك مرة أخرى بعد استلام طلبك خلال 24 ساعة' : 'We will contact again after receive your request in 24h' }</p>
        </div>
        <div className="content">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <form action="contact.php" className="form" method="post" onSubmit={handleFormSubmit}>
                <p className="text-center text-danger fs-12px mb-30">{ rtl ? 'الحقل اللذى يحتوى على هذة العلامة اجبارى *' : 'The field is required mark as *' }</p>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group mb-20">
                      <input type="text" name="name" className="form-control" placeholder={ rtl ? 'الاسم' : "Name" } onChange={handleFormChange} />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group mb-20">
                      <input type="text" name="email" className="form-control" placeholder={ rtl ? 'البريد الالكترونى *' : "Email Address *" } onChange={handleFormChange} />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group mb-20">
                      <input type="text" name="phone" className="form-control" placeholder={ rtl ? 'رقم الهاتف (اختيارى)' : "Phone Number (option)" } onChange={handleFormChange} />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group mb-20">
                      <input type="text" name="website" className="form-control" placeholder={ rtl ? 'موقعك الالكترونى (اختيارى)' : "Your Website (option)" } onChange={handleFormChange} />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-20">
                      <select className="form-select" name="option" defaultValue={ rtl ? 'كيف يمكننا مساعدتك ؟ ' : 'How can we help you?' } onChange={handleFormChange}>
                        <option value="How can we help you?">{ rtl ? 'كيف يمكننا مساعدتك ؟ ' : 'How can we help you?' }</option>
                        <option value="option 1">{ rtl ? 'الاختيار الاول' : 'option 1' }</option>
                        <option value="option 2">{ rtl ? 'الاختيار الثاني' : 'option 2' }</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea rows="10" className="form-control" name="message" placeholder={ rtl ? 'كيف يمكننا مساعدتك ؟ ' : 'How can we help you?' } onChange={handleFormChange}></textarea>
                    </div>
                  </div>
                  <div className="col-lg-12 text-center">
                    <div className="form-check d-inline-flex mt-30 mb-30">
                      <input className="form-check-input me-2 mt-0" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label small" htmlFor="flexCheckDefault">
                        { rtl ? 'من خلال الإرسال ، أوافق على' : 'By submitting, i’m agreed to the' } <a href="#" className="text-decoration-underline">{ rtl ? 'الشروط و الاحكام' : 'Terms & Conditons' }</a>
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-12 text-center">
                    <input type="submit" value={ rtl ? 'ارسل طلبك' : "Send Your Request" } className="btn rounded-pill blue5-3Dbutn hover-blue2 sm-butn fw-bold text-light" />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <img src="/assets/img/icons/contact_a.png" alt="" className="contact_a" />
          <img src="/assets/img/icons/contact_message.png" alt="" className="contact_message" />
        </div>
      </div>
    </section>
  )
}

export default Contact