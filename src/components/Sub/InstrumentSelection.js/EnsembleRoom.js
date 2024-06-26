import React, { useState, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";
import axios, { axiosPrivate } from "../../../api/axios";

const Button = ({ label, isSelected, onClick }) => {
    return (
        <button
            style={{
                backgroundColor: isSelected ? "#D6E0F3" : "white",
                borderRadius: "3px",
                width: "100px",
                height: "40px",
                border: "1px solid black",
            }}
            // 새로고침 방지
            onClick={(event) => {
                event.preventDefault();
                onClick();
            }}
        >
            {label}
        </button>
    );
};

const EnsembleRoom = () => {
    const [selectedAddress, setSelectedAddress] = useState(""); // 주소 상태
    const [selectedAddressDetail, setSelectedAddressDetail] = useState(""); // 상세 주소 상태
    const [isPostOpen, setIsPostOpen] = useState(false); // 주소찾기 창 상태

    const [selectedEquipment, setSelectedEquipment] = useState(null); // 음향장비 유무를 위한 상태
    const [selectedInstrument, setSelectedInstrument] = useState(null); // 악기 유무를 위한 상태
    const [price, setPrice] = useState(""); // 가격을 위한 상태
    const [selectedCapacity, setSelectedCapacity] = useState(""); // 수용인원 상태
    const [selectedSize, setSelectedSize] = useState(""); // 사이즈 상태
    const [selectedParking, setSelectedParking] = useState(null); // 주차 가능 여부를 위한 상태
    const [hashtags, setHashtags] = useState([""]); // 해시태그 상태 추가


    // 주소 선택 핸들러
    const handleAddressComplete = (data) => {
        setSelectedAddress(data.address);
        setIsPostOpen(false); // 주소 선택시 팝업 창 닫기
    };

    // 상세 주소 입력 핸들러
    const handleAddressDetail = (event) => {
        const inputAddressDetail = event.target.value;
        setSelectedAddressDetail(inputAddressDetail);
    };

    // 팝업 창 닫기
    const closePostcode = () => {
        setIsPostOpen(false);
    };

    //음향장비 유무를 위한 핸들러
    const handleEquipmentButtonClick = (state) => {
        setSelectedEquipment(state);
    };

    //악기 유무를 위한 핸들러
    const handleInstrumentButtonClick = (state) => {
        setSelectedInstrument(state);
    };

    // 가격 입력 핸들러
    const handlePrice = (event) => {
        // 사용자가 입력한 값에서 숫자가 아닌 문자를 모두 제거
        const inputPrice = event.target.value.replace(/[^0-9]/g, ""); // 숫자가 아닌 문자를 제거합니다.
        setPrice(inputPrice /*+ '원'*/);
    };

    // 수용인원 입력 핸들러
    const handleCapacity = (event) => {
        // 사용자가 입력한 값에서 숫자가 아닌 문자를 모두 제거
        const inputCapacity = event.target.value.replace(/[^0-9]/g, ""); // 숫자가 아닌 문자를 제거합니다.
        setSelectedCapacity(inputCapacity);
    };

    // 사이즈 입력 핸들러
    const handleSize = (event) => {
        const inputSize = event.target.value;
        setSelectedSize(inputSize);
    };

    // 주차 가능 여부 버튼을 위한 핸들러
    const handleParkingButtonClick = (parking) => {
        setSelectedParking(parking);
    };

    // 해시태그 입력 핸들러
    const handleHashtagChange = (event, index) => {
        const value = event.target.value.startsWith("#")
            ? event.target.value
            : `#${event.target.value}`;
        const newHashtags = [...hashtags];
        newHashtags[index] = value.slice(0, 11); // '#' 포함 최대 11자
        setHashtags(newHashtags);
    };

    // 해시태그 추가 핸들러
    const handleAddHashtag = () => {
        if (hashtags.length < 5) {
            // 해시태그 최대 5개 제한
            setHashtags([...hashtags, "#"]); // 새 해시태그 기본값으로 '#' 설정
        }
    };

    // 해시태그 삭제 핸들러
    const handleRemoveHashtag = (index) => {
        const newHashtags = hashtags.filter((_, i) => i !== index);
        setHashtags(newHashtags);
    };

    // const updateData = () => {
    //     const ensembleRoomData = {
    //         brand: selectedBrand,
    //         model: selectedModel,
    //         productionYear: productionYear,
    //         color: selectedColor,
    //         selectedState: selectedState,
    //         price: price,
    //         selectedFeature: selectedFeature,
    //         hashtags: hashtags,
    //     };
    //     // 선택한 시도, 시군구, 읍면동 값을 guitarData 객체에 추가
    //     guitarData.tradeAddress = {
    //         sido: selectedSido,
    //         sgg: selectedSgg,
    //         emd: selectedEmd,
    //     };
    //     updateEnsembleRoomData(ensembleRoomData);
    // };

    // useEffect(() => {
    //     updateData();
    // }, [
    //     selectedBrand,
    //     selectedModel,
    //     productionYear,
    //     selectedColor,
    //     selectedState,
    //     price,
    //     selectedFeature,
    //     hashtags,
    // ]);

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
                {/* 주소 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>주소</p>
                </div>
                {/* 음향장비 유무 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "80px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>음향장비 여부</p>
                </div>
                {/* 악기 여부 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>악기 여부</p>
                </div>
                {/* 가격 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>가격</p>
                </div>
                {/* 수용 인원 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>수용 인원</p>
                </div>
                {/* 사이즈 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>사이즈</p>
                </div>
                {/* 주차 가능 여부 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>주차 가능 여부</p>
                </div>
                {/* 해시태그 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>해시태그(선택)</p>
                </div>
            </div>

            {/* 옵션들 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "200px",
                }}
            >
                {/* 주소 입력 칸 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "25px",
                    }}
                >
                    <input
                        type="text"
                        value={selectedAddress}
                        readOnly
                        style={{
                            width: "600px",
                            height: "40px",
                            borderRadius: "3px",
                            border: "1px solid black",
                            padding: "10px",
                            marginRight: "10px",
                        }}
                    />
                    <button
                        style={{
                            backgroundColor: "#D6E0F3",
                            borderRadius: "7px",
                            width: "100px",
                            height: "40px",
                            border: "none",
                            cursor: "pointer",
                        }}
                        onClick={(event) => {
                            event.preventDefault();
                            setIsPostOpen(true);
                        }}
                    >
                        주소 찾기
                    </ button>
                    {isPostOpen && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                            }}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    width: "600px",
                                    height: "510px",
                                    backgroundColor: "white",
                                    padding: "20px",
                                }}
                            >
                                <DaumPostcode onComplete={handleAddressComplete} style={{ width: "100%", height: "100%" }} />
                                <button
                                    onClick={closePostcode}
                                    style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "10px",
                                        border: "none",
                                        backgroundColor: "white"
                                    }}
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {/* 상세 주소 입력 칸 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "15px",
                    }}
                >
                    <input
                        type="text"
                        value={selectedAddressDetail}
                        onChange={handleAddressDetail}
                        placeholder="정확한 상세 주소를 입력해주세요"
                        style={{
                            minWidth: "710px",
                            height: "40px",
                            borderRadius: "3px",
                            border: "1px solid black",
                            padding: "10px",
                            marginRight: "10px",
                        }}
                    />
                </div>
                {/* 음향 장비 유무 버튼 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "25px",
                    }}
                >
                    <Button
                        label="O"
                        isSelected={selectedEquipment === true}
                        onClick={() => handleEquipmentButtonClick(true)}
                    />
                    <Button
                        label="X"
                        isSelected={selectedEquipment === false}
                        onClick={() => handleEquipmentButtonClick(false)}
                    />
                </div>
                {/* 악기 유무 버튼 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "25px",
                    }}
                >
                    <Button
                        label="O"
                        isSelected={selectedInstrument === true}
                        onClick={() => handleInstrumentButtonClick(true)}
                    />
                    <Button
                        label="X"
                        isSelected={selectedInstrument === false}
                        onClick={() => handleInstrumentButtonClick(false)}
                    />
                </div>
                {/* 가격입력칸 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "25px",
                    }}
                >
                    <input
                        type="text"
                        value={price}
                        onChange={handlePrice}
                        placeholder="숫자만 기입해주세요"
                        style={{
                            width: "200px",
                            height: "40px",
                            borderRadius: "3px",
                            border: "1px solid black",
                            padding: "10px",
                        }}
                    />
                </div>
                {/* 수용 인원 입력 칸 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "25px",
                    }}
                >
                    <input
                        type="text"
                        value={selectedCapacity}
                        onChange={handleCapacity}
                        placeholder="숫자만 기입해주세요"
                        style={{
                            width: "200px",
                            height: "40px",
                            borderRadius: "3px",
                            border: "1px solid black",
                            padding: "10px",
                        }}
                    />
                </div>
                {/* 사이즈 입력 칸 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "25px",
                    }}
                >
                    <input
                        type="text"
                        value={selectedSize}
                        onChange={handleSize}
                        placeholder="단위까지 기입해주세요. ex) 5평, 100m^3"
                        style={{
                            width: "200px",
                            height: "40px",
                            borderRadius: "3px",
                            border: "1px solid black",
                            padding: "10px",
                        }}
                    />
                </div>
                {/* 주차 가능 여부 버튼 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "25px",
                    }}
                >
                    <Button
                        label="O"
                        isSelected={selectedParking === true}
                        onClick={() => handleParkingButtonClick(true)}
                    />
                    <Button
                        label="X"
                        isSelected={selectedParking === false}
                        onClick={() => handleParkingButtonClick(false)}
                    />
                </div>
                {/* 해시태그 입력칸 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "25px",
                    }}
                >
                    {hashtags.map((hashtag, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginRight: "5px",
                            }}
                        >
                            <input
                                type="text"
                                value={hashtag}
                                onChange={(event) =>
                                    handleHashtagChange(event, index)
                                }
                                placeholder="해시태그 입력"
                                style={{
                                    width: "170px",
                                    height: "40px",
                                    borderRadius: "3px",
                                    border: "1px solid black",
                                }}
                            />
                            <button
                                onClick={() => handleRemoveHashtag(index)}
                                style={{
                                    height: "40px",
                                    width: "25px",
                                    marginLeft: "5px",
                                }}
                            >
                                -
                            </button>
                        </div>
                    ))}
                    {hashtags.length < 5 && (
                        <button
                            type="button" // 새로고침 방지
                            onClick={handleAddHashtag}
                            style={{ height: "40px" }}
                        >
                            +
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnsembleRoom;
