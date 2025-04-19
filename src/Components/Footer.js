import React from 'react';

function Footer() {
  return (
    <>
      <footer className="bg-info text-center text-lg-start">
        <div className="container p-4 pb-0">
          <form action="">
            <div className="row">
              {/* Quick Info */}
              <div className="col-auto mb-4 mb-md-0 fs-3">
                <p className="pt-2">
                  <strong>Sign up for our Tenders updates</strong>
                </p>
              </div>

              {/* Email Input */}
              <div className="col-md-5 col-12 mb-4 mb-md-0">
                <div data-mdb-input-init className="form-outline mb-4 fs-4">
                  <input type="email" id="form5Example22" className="form-control" />
                  <label className="form-label" htmlFor="form5Example22">
                    Email address
                  </label>
                </div>
              </div>

              {/* Subscribe Button */}
              <div className="col-auto mb-4 mb-md-0">
                <button data-mdb-ripple-init type="button" className="btn btn-primary mb-4 fs-5">
                  Subscribe
                </button>
              </div>
            </div>
          </form>
        </div>

        <div
          className="text-center p-3 fs-3"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        >
          © 2025 Copyright:
          <a className="text-body" href="https://mdbootstrap.com/">
            tenders.com
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
