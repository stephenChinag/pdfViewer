import { Viewer, Worker } from "@react-pdf-viewer/core";
import { ChangeEvent, useState } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
export default function PdfViewer() {
  const [pdfFile, setPdfFile] = useState(null);

  const [viewPdf, setViewPdf] = useState(null);
  const fileType = ["application/pdf"];
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();

        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
          setPdfFile(e.target?.result);
        };
      } else {
        setPdfFile(null);
      }
    } else {
      console.log("please select A file");
    }
  };

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    } else {
      setViewPdf(null);
    }
  };

  const newplugin = defaultLayoutPlugin();
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <button type="submit"> View PDF</button>
      </form>

      <h2> View Pdf</h2>

      <div className="pdf-container">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          {viewPdf && (
            <>
              <Viewer fileUrl={viewPdf} plugins={[newplugin]} />
            </>
          )}
          {!viewPdf && <> No PDF</>}
        </Worker>
      </div>
    </div>
  );
}
