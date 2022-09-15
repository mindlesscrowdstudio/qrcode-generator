import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

/**
 * On the <input> element, the onChange event handler with the function ‘qrCodeEncoder’ takes in the users’ input, gets its value and changes the QR code with each new input typed
 * https://coolsuppliesmx.mitiendanube.com/
 */

const QrCode = ()  => {
    const [url, setUrl] = useState("");
    const qrRef = useRef();
// the downloadQRCode function attached to the onSubmit method of the <form> element as this is triggered by the submit event
    const downloadQRCode = (e) => {
        e.preventDefault();
        let canvas = qrRef.current.querySelector('canvas');
        let image = canvas.toDataURL("image/png");
        let anchor = document.createElement("a");
        //the href is set to the image that downloads the QR code when the button is clicked
        anchor.href = image;
        anchor.download = `qr-code.png`;
        
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        setUrl("");
    };
    const qrCodeEncoder = (e) => {
        setUrl(e.target.value);
    };

    const qrcode = (
        <QRCodeCanvas
        id="qrCode"
        value={url}
        size={300}
        bgColor={"#f6f6f6"}
        level={"H"}
        />
    );
    return (
        <div className="qrcode__container">
            <div ref={qrRef}>{qrcode}</div>
            <div className="input__group">
                <form onSubmit={downloadQRCode}>
                    <label>Agrega la URL: </label>
                    <input
                        type="text"
                        value={url}
                        onChange={qrCodeEncoder}
                        placeholder="https://coolsuppliesmx.mitiendanube.com"/>
                    <button type="submit" disabled={!url}>Descarga el código QR</button>
                </form>
            </div>
        </div>
    )
};

 export default QrCode;