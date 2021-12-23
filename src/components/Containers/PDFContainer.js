import React from "react";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import Button from "@material-ui/core/Button";
const PDFContainer = ({ data }) => {
  return (
    <>
      <p className="font-header font-size-header text-center">PDFs</p>
      <div className="d-flex flex-wrap justify-content-center">
        {data &&
          data.map((el) => {
            return (
              <div className="mx-2 mt-2" key={el}>
                <a href={el.src} download>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CloudDownloadIcon />}
                    download
                  >
                    {el.label}
                  </Button>
                </a>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PDFContainer;
