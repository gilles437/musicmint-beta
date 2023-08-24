import { useEffect } from 'react';

const TabContent = ({ isActive, id }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const elem = document.querySelector('#' + e.target.href.split('#')[1]);
    elem.scrollIntoView();

    document.querySelectorAll('.faq-category ul li a').forEach(elm => elm.classList.remove('active'));
    e.target.classList.add('active');
  }

  /**
   * Making the 'Question Category' section sticky
   */
  useEffect(() => {
    window.addEventListener('scroll', () => {
      const faqCategory = document.querySelector('.faq-category');
      const width = faqCategory.getBoundingClientRect().width;

      if (window.matchMedia('(max-width: 992px)').matches) {
        faqCategory.style.position = 'sticky';
      } else {
        if (window.scrollY >= 700) {
          faqCategory.style.position = 'fixed';
          faqCategory.style.width = width + 'px';
        } else {
          faqCategory.style.position = 'sticky';
        }
      }
    });
  }, []);

  return (
    <div className={`tab-pane ${isActive ? 'show active':''} fade`} id={id} role="tabpanel">
      <div className="faq-body">
        <div className="container">
          <div className="row gx-5">
            <div className="col-lg-4">
              <div className="faq-category">
                <h5> Question Category: </h5>
                <ul>
                  <li>
                    <a href="#accordion1" className="active" onClick={handleClick}> Installation </a>
                    <span> 06 </span>
                  </li>
                  <li>
                    <a href="#accordion2" onClick={handleClick}> Getting Started </a>
                    <span> 04 </span>
                  </li>
                  <li>
                    <a href="#accordion3" onClick={handleClick}> Page Builder </a>
                    <span> 03 </span>
                  </li>
                  <li>
                    <a href="#accordion4" onClick={handleClick}> Header Builder </a>
                    <span> 03 </span>
                  </li>
                  <li>
                    <a href="#accordion5" onClick={handleClick}> Footer Builder </a>
                    <span> 04 </span>
                  </li>
                  <li>
                    <a href="#accordion6" onClick={handleClick}> Support </a>
                    <span> 05 </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="faq-questions">
                <div className="accordion pt-lg-0" id="accordion1">
                  <h5 className="sec-title mt-0"> <span> 01. </span> Installation </h5>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="hd1">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#bd1" aria-expanded="true" aria-controls="collapseOne">
                        Global search engine optimization
                      </button>
                    </h2>
                    <div id="bd1" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordion1">
                      <div className="accordion-body">
                        <div className="text">
                          Sass (short for syntactically awesome style sheets) is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets. The Sass Script is the scripting language itself. Sass consists of two syntaxes.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="hd2">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bd2" aria-expanded="false" aria-controls="collapseTwo">
                        Complete Social Media Integration
                      </button>
                    </h2>
                    <div id="bd2" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordion1">
                      <div className="accordion-body">
                        <div className="text">
                          Sass (short for syntactically awesome style sheets) is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets. The Sass Script is the scripting language itself. Sass consists of two syntaxes.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="hd3">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bd3" aria-expanded="false" aria-controls="collapseThree">
                        End-to-end encryption for messages
                      </button>
                    </h2>
                    <div id="bd3" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordion1">
                      <div className="accordion-body">
                        <div className="text">
                          Sass (short for syntactically awesome style sheets) is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets. The Sass Script is the scripting language itself. Sass consists of two syntaxes.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="accordion" id="accordion2">
                  <h5 className="sec-title"> <span> 02. </span> Getting Started </h5>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="hd4">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bd4" aria-expanded="true" aria-controls="collapseOne">
                        What could kill the company?
                      </button>
                    </h2>
                    <div id="bd4" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordion2">
                      <div className="accordion-body">
                        <div className="text">
                          Sass (short for syntactically awesome style sheets) is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets. The Sass Script is the scripting language itself. Sass consists of two syntaxes.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="hd5">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bd5" aria-expanded="false" aria-controls="collapseTwo">
                        Are there any worth being a little proactive about?
                      </button>
                    </h2>
                    <div id="bd5" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordion2">
                      <div className="accordion-body">
                        <div className="text">
                          Sass (short for syntactically awesome style sheets) is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets. The Sass Script is the scripting language itself. Sass consists of two syntaxes.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="hd6">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bd6" aria-expanded="false" aria-controls="collapseThree">
                        What qualities, feelings, attributes do we want?
                      </button>
                    </h2>
                    <div id="bd6" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordion2">
                      <div className="accordion-body">
                        <div className="text">
                          Sass (short for syntactically awesome style sheets) is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets. The Sass Script is the scripting language itself. Sass consists of two syntaxes.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="accordion" id="accordion3">
                  <h5 className="sec-title"> <span> 03. </span> Page Builder </h5>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="hd7">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bd7" aria-expanded="true" aria-controls="collapseOne">
                        Materially help someone else with their priorities?
                      </button>
                    </h2>
                    <div id="bd7" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordion3">
                      <div className="accordion-body">
                        <div className="text">
                          Sass (short for syntactically awesome style sheets) is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets. The Sass Script is the scripting language itself. Sass consists of two syntaxes.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="hd8">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bd8" aria-expanded="false" aria-controls="collapseTwo">
                        To poor or missing internal communication?
                      </button>
                    </h2>
                    <div id="bd8" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordion3">
                      <div className="accordion-body">
                        <div className="text">
                          Sass (short for syntactically awesome style sheets) is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets. The Sass Script is the scripting language itself. Sass consists of two syntaxes.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="hd9">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bd9" aria-expanded="false" aria-controls="collapseThree">
                        We address those with features or marketing?
                      </button>
                    </h2>
                    <div id="bd9" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordion3">
                      <div className="accordion-body">
                        <div className="text">
                          Sass (short for syntactically awesome style sheets) is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets. The Sass Script is the scripting language itself. Sass consists of two syntaxes.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="accordion" id="accordion4">
                  <h5 className="sec-title"> <span> 04. </span> Header Builder </h5>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="hd7">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bd7" aria-expanded="true" aria-controls="collapseOne">
                        How could we all impact that metric?
                      </button>
                    </h2>
                    <div id="bd7" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordion4">
                      <div className="accordion-body">
                        <div className="text">
                          Sass (short for syntactically awesome style sheets) is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets. The Sass Script is the scripting language itself. Sass consists of two syntaxes.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="hd8">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bd8" aria-expanded="false" aria-controls="collapseTwo">
                        That we’re not listening to?
                      </button>
                    </h2>
                    <div id="bd8" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordion4">
                      <div className="accordion-body">
                        <div className="text">
                          Sass (short for syntactically awesome style sheets) is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets. The Sass Script is the scripting language itself. Sass consists of two syntaxes.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="hd9">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bd9" aria-expanded="false" aria-controls="collapseThree">
                        How would we accomplish that?
                      </button>
                    </h2>
                    <div id="bd9" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordion4">
                      <div className="accordion-body">
                        <div className="text">
                          Sass (short for syntactically awesome style sheets) is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets. The Sass Script is the scripting language itself. Sass consists of two syntaxes.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="accordion" id="accordion5">
                  <h5 className="sec-title"> <span> 05. </span> Footer Builder </h5>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="hd10">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bd10" aria-expanded="true" aria-controls="collapseOne">
                        If all our source code were stolen, would it matter?
                      </button>
                    </h2>
                    <div id="bd10" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordion5">
                      <div className="accordion-body">
                        <div className="text">
                          Sass (short for syntactically awesome style sheets) is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets. The Sass Script is the scripting language itself. Sass consists of two syntaxes.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="hd11">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bd11" aria-expanded="false" aria-controls="collapseTwo">
                        We do differently such that it wouldn’t matter?
                      </button>
                    </h2>
                    <div id="bd11" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordion5">
                      <div className="accordion-body">
                        <div className="text">
                          Sass (short for syntactically awesome style sheets) is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets. The Sass Script is the scripting language itself. Sass consists of two syntaxes.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="hd12">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bd12" aria-expanded="false" aria-controls="collapseThree">
                        How could we institutionalize communicating it?
                      </button>
                    </h2>
                    <div id="bd12" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordion5">
                      <div className="accordion-body">
                        <div className="text">
                          Sass (short for syntactically awesome style sheets) is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets. The Sass Script is the scripting language itself. Sass consists of two syntaxes.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="accordion" id="accordion6">
                  <h5 className="sec-title"> <span> 06. </span> Support </h5>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="hd13">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bd13" aria-expanded="true" aria-controls="collapseOne">
                        About you that not many people know?
                      </button>
                    </h2>
                    <div id="bd13" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordion6">
                      <div className="accordion-body">
                        <div className="text">
                          Sass (short for syntactically awesome style sheets) is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets. The Sass Script is the scripting language itself. Sass consists of two syntaxes.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="hd14">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bd14" aria-expanded="false" aria-controls="collapseTwo">
                        What should we do about that?
                      </button>
                    </h2>
                    <div id="bd14" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordion6">
                      <div className="accordion-body">
                        <div className="text">
                          Sass (short for syntactically awesome style sheets) is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets. The Sass Script is the scripting language itself. Sass consists of two syntaxes.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="hd15">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bd15" aria-expanded="false" aria-controls="collapseThree">
                        What should we do soon to prevent some of that?
                      </button>
                    </h2>
                    <div id="bd15" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordion6">
                      <div className="accordion-body">
                        <div className="text">
                          Sass (short for syntactically awesome style sheets) is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets. The Sass Script is the scripting language itself. Sass consists of two syntaxes.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabContent