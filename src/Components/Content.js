import React from 'react';

function Content({ text,setContentText }) {
  return (
    <div className="container-fluid text-light my-5">
      <div className="row">
        <div className="col-3 bg-warning text-dark pe-4 rounded-5">
          <h3 className="fs-1">Quick links</h3>
          <ul className="list-unstyled">
            <li className="p-2">
              <a href="#content-section "  onClick={()=>setContentText(`A𝖢𝖳𝖨𝖵𝖤 𝖳𝖤𝖭𝖣𝖤𝖱𝖲  :          𝖳𝖾𝗇𝖽𝖾𝗋𝗌 𝖺𝗋𝖾 𝖻𝗂𝖽𝗌 𝗌𝗎𝖻𝗆𝗂𝗍𝗍𝖾𝖽 𝖻𝗒 𝖻𝗎𝗌𝗂𝗇𝖾𝗌𝗌𝖾𝗌 𝗈𝗋 𝗂𝗇𝖽𝗂𝗏𝗂𝖽𝗎𝖺𝗅𝗌 𝗍𝗈 𝖿𝗎𝗅𝖿𝗂𝗅𝗅 𝗌𝗉𝖾𝖼𝗂𝖿𝗂𝖼 𝗀𝗈𝗏𝖾𝗋𝗇𝗆𝖾𝗇𝗍 𝗉𝗋𝗈𝗃𝖾𝖼𝗍𝗌 𝗈𝗋 𝗌𝗎𝗉𝗉𝗅𝗒 𝗌𝖾𝗋𝗏𝗂𝖼𝖾𝗌. 𝖳𝗁𝗋𝗈𝗎𝗀𝗁 𝗍𝗁𝗂𝗌 𝗉𝗈𝗋𝗍𝖺𝗅, 𝖼𝗈𝗇𝗍𝗋𝖺𝖼𝗍𝗈𝗋𝗌, 𝗌𝗎𝗉𝗉𝗅𝗂𝖾𝗋𝗌, 𝖺𝗇𝖽 𝖼𝗈𝗇𝗌𝗎𝗅𝗍𝖺𝗇𝗍𝗌 𝖼𝖺𝗇 𝖾𝗑𝗉𝗅𝗈𝗋𝖾 𝖼𝗎𝗋𝗋𝖾𝗇𝗍 𝗈𝗉𝗉𝗈𝗋𝗍𝗎𝗇𝗂𝗍𝗂𝖾𝗌, 𝗉𝖺𝗋𝗍𝗂𝖼𝗂𝗉𝖺𝗍𝖾 𝗂𝗇 𝗉𝗋𝗈𝖼𝗎𝗋𝖾𝗆𝖾𝗇𝗍 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝖾𝗌, 𝖺𝗇𝖽 𝖼𝗈𝗇𝗍𝗋𝗂𝖻𝗎𝗍𝖾 𝗍𝗈 𝗉𝗎𝖻𝗅𝗂𝖼 𝗂𝗇𝗂𝗍𝗂𝖺𝗍𝗂𝗏𝖾𝗌 𝖾𝖿𝖿𝖾𝖼𝗍𝗂𝗏𝖾𝗅𝗒. `)} className="text-secondary text-decoration-underline fs-2">
                Active Tenders
              </a>
            </li>
            <li className="p-2">
              <a href="#content-section" onClick={()=>setContentText(`NEW TENDERS :
Explore the latest government tender opportunities designed to engage contractors, suppliers, and consultants.
Stay updated on recently announced projects and register to participate in transparent and competitive procurement processes`)
              } className="text-secondary text-decoration-underline fs-2 ">
                New Tenders
              </a>
            </li>
            <li className="p-2 ">
              <a href="#content-section" onClick={()=>setContentText(`CLOSED TENDER :

Closed tenders represent procurement opportunities that have already passed their submission deadlines. These tenders are no longer open for bids, and all offers have been reviewed or are in the process of evaluation. However, stakeholders can still access and track the status of these tenders through this portal, which provides a transparent view of past tender activities. For future opportunities, keep an eye on upcoming tenders to ensure participation in government projects and contracts.`)} className="text-secondary text-decoration-underline fs-2">
                Closed Tenders
              </a>
            </li>
            <li className="p-2">
              <a href="#content-section" onClick={()=>setContentText(`

ARCHIVED TENDER :

Archived tenders are those that have been completed, closed, or canceled. These tenders are no longer open for submission or bidding, but they are kept on record for transparency and future reference. This portal allows users to review past tender information, track project histories, and analyze previous submissions. Although no new bids can be made for archived tenders, this provides valuable insights for contractors, suppliers, and consultants in understanding government procurement trends.`)}  className="text-secondary text-decoration-underline fs-2">
                Archived Tenders
              </a>
            </li>
          </ul>
        </div>

        <div className="col-md-9 fs-2 ps-4 bg-secondary ">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}

export default Content;
