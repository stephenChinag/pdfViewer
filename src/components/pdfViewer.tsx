import { ChangeEvent, useState } from "react";

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
          setPdfFile(e.target.result);
        };
      } else {
        setPdfFile(null);
      }
    } else {
      console.log("please select A file");
    }
  };
  return (
    <div>
      <form>
        <input type="file" onChange={handleChange} />
        <button type="submit"> View PDF</button>
      </form>

      <h2> View Pdf</h2>

      <div className="pdf-container"></div>
    </div>
  );
}
