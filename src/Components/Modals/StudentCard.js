import React from "react";
import html2canvas from "html2canvas";
import { Button } from "@chakra-ui/react";

const StudentCard = ({ student, qrCode }) => {
    console.log(student, qrCode);
    const captureAndDownload = async () => {
        const cardFront = document.querySelector(".card-front");
        const cardBack = document.querySelector(".card-back");

        // Capture front and back of the card
        const frontCanvas = await html2canvas(cardFront);
        const backCanvas = await html2canvas(cardBack);

        // Convert canvases to images
        const frontImage = frontCanvas.toDataURL("image/png");
        const backImage = backCanvas.toDataURL("image/png");

        // Create a download link for the front card
        const frontLink = document.createElement("a");
        frontLink.href = frontImage;
        frontLink.download = `card-front-${(student.name)?.replace(' ', '')}-${student._id}.png`;
        frontLink.click();

        // Create a download link for the back card
        const backLink = document.createElement("a");
        backLink.href = backImage;
        backLink.download = `card-back-${(student.name)?.replace(' ', '')}-${student._id}.png`;
        backLink.click();
    };

    return (
        <>
            <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                <div
                    className="card-front"
                    style={{ display: "grid", width: "288px" }}
                >
                    <div className="relative w-72 h-56 bg-black p-6">
                        <img src="/card-logo.png" className="w-36 mx-auto" alt="random" />
                    </div>
                    <div className="relative w-72 h-20 bg-white">
                        <img
                            src={student.image || "/17698878.jpg"}
                            style={{ border: "4px solid goldenrod" }}
                            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36"
                            alt="random"
                        />
                    </div>
                    <div className="relative w-72 h-48 p-5 bg-white">
                        <table style={{ textAlign: "left" }}>
                            <tbody>
                                <tr>
                                    <th>Name:</th>
                                    <td>
                                        <u>{student.name || "N/A"}</u>
                                    </td>
                                </tr>
                                <tr>
                                    <th>S/O:</th>
                                    <td>
                                        <u>{student.father_name || "N/A"}</u>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Batch:</th>
                                    <td>
                                        <u>{student.batch.startdate || "N/A"}</u>
                                    </td>
                                </tr>
                                <tr>
                                    <th>ID:</th>
                                    <td>
                                        <u>{student._id || "N/A"}</u>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="w-72 h-9 p-2" style={{ backgroundColor: "goldenrod" }}>
                        <p className="text-center text-black font-bold">
                            0331-000-111-0 / 0333-9800938
                        </p>
                    </div>
                </div>
                <div
                    className="card-back ml-4"
                    style={{ display: "grid", justifyContent: "center", width: "288px", marginTop: "-1px" }}
                >
                    <div className="relative w-72 h-16 bg-black p-2">
                        <h2
                            style={{ color: "goldenrod", textAlign: "center" }}
                            className="font-bold text-xl"
                        >
                            LAHORE CSS ACADEMY
                        </h2>
                        <p
                            style={{ color: "white", textAlign: "center" }}
                            className="text-xs"
                        >
                            WE GO ACHIEVING
                        </p>
                    </div>
                    <div className="relative w-72 h-36 p-10 bg-white">
                        <table style={{ textAlign: "center" }}>
                            <tbody>
                                <tr>
                                    <th>Issued on:</th>
                                    <td>
                                        <u> August/18/2024</u>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Valid Till:</th>
                                    <td>
                                        <u> August/18/2025</u>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="w-72 h-9 p-1" style={{ backgroundColor: "goldenrod" }}>
                        <p className="text-center text-black font-bold text-xl">
                            INSTRUCTIONS
                        </p>
                    </div>
                    <div className="relative w-72 h-64 p-7 bg-white">
                        <ol
                            style={{
                                fontSize: "12px",
                                fontFamily: "calibri",
                                listStyleType: "decimal",
                            }}
                        >
                            <li>This card is property of Lahore CSS Academy.</li>
                            <li>This card is for personal use only and is not transferable.</li>
                            <li> If found please return to the below address.</li>
                        </ol>
                        <div className="absolute bottom-2 left-2">
                            {/* QR Code component goes here */}
                            <img src={`data:image/svg+xml;utf8,${encodeURIComponent(qrCode)}`} alt="QR Code" className="w-32 h-32" />
                        </div>
                        <div className="absolute bottom-2 right-2 text-right">
                            <hr className="border-t-2 border-black mb-1" />
                            <span className="font-semibold">Issuing Authority</span>
                        </div>
                    </div>
                    <div className="w-72 h-9 p-1" style={{ backgroundColor: "goldenrod" }}>
                        <p style={{
                            fontSize: "11px",
                            fontFamily: "calibri",
                            textAlign: "center",
                            color: "black",
                            fontWeight: "bold",
                            padding: "6px",
                        }}>
                            13- Sher Shah, New Garden Town, Barkat Market, Lahore
                        </p>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
                <Button
                    marginTop={"0.75rem"}
                    marginBottom={"0.75rem"}
                    borderRadius={"0.75rem"}
                    backgroundColor={"#FFCB82"}
                    color={"#85652D"}
                    _hover={{
                        backgroundColor: "#E3B574",
                        color: "#654E26",
                    }}
                    fontWeight={"500"}
                    type="submit"
                    loadingText="Saving"
                    onClick={captureAndDownload}
                >
                    Download Card Images
                </Button>
            </div>
        </>
    );
};

export default StudentCard;
