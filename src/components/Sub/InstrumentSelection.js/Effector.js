import React, { useState, useEffect }  from 'react'
import axios from '../../../api/axios';
import PopupButton from '../PopupButton';

const Button = ({ label, isSelected, onClick }) => {
  return (
    <button style={{ backgroundColor: isSelected ? '#D6E0F3' : 'white', borderRadius: '3px', 
      width: '100px', height: '40px', border: '1px solid black' }} onClick={onClick}>
      {label}
    </button>
  );
};

const Effector = () => {  
  const [Sido, setSido] = useState([]); // 거래지역 상태
  const [Sgg, setSgg] = useState([]); // 시군구 상태 추가
  const [Emd, setEmd] = useState([]); // 읍면동 상태 추가
  const [selectedSido, setSelectedSido] = useState(""); // 선택된 거래지역 상태 추가
  const [selectedSgg, setSelectedSgg] = useState(""); // 선택된 시군구 상태 추가
  const [selectedEmd, setSelectedEmd] = useState(""); // 선택된 읍면동 상태 추가
  const [selectedState, setSelectedState] = useState(null); // 악기 상태 선택을 위한 상태
  const [selectedType, setSelectedType] = useState(""); // 종류 상태
  const [functions, setFunctions] = useState([]); // 기능 상태
  const [price, setPrice] = useState(""); // 가격을 위한 상태
  const [selectedFeature, setSelectedFeature] = useState(null); // 특이사항 유무를 위한 상태
  const [hashtags, setHashtags] = useState([""]); // 해시태그 상태

  const [isPopupOpen, setIsPopupOpen] = useState(false); // 단계설명 표 열고 닫는 상태

  // 팝업 내용
  const popupData = [
    { label: '5단계', value: '외관/사용 모두 완벽, 신동품' },
    { label: '4단계', value: '외관/사용 모두 문제 없음' },
    { label: '3단계', value: '사용에 문제 없으나 외관에 덴트, 녹 등 존재' },
    { label: '2단계', value: '사용에 문제 있음. 셋업/수리 필요' },
    { label: '1단계', value: '부품용/상태 안좋음' }
  ];

  // 팝업 열기
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // 팝업 닫기
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // 시도 get api
  useEffect(() => {
    // 매물 정보를 불러오는 API 호출
    axios.get('/api/administrative-areas/sido') // 가정한 URL, 실제 URL로 변경 필요
      .then(response => {
        // 응답으로 받은 매물 정보로 상태 업데이트
        setSido(response.data);
        console.log("시도:",response.data );
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  // 악기 상태를 위한 핸들러
  const handleButtonClick = (state) => {
      setSelectedState(state);
  };
  
  const typeToFunctions = {
    기타: ['와우', 'Eq', '볼륨', '컴프', '오버', '디스토션', '부스트', '공간계', '모듈레이션', '앰프시뮬', '멀티', '보드용부품', '그 외'],
    베이스: ['컴프레서', '리미터', '드라이브', '그 외'],
    멀티: ['선택불가 display'],
    페달보드: ['보드', '파워서플라이', '버퍼', '병렬믹서', '그 외']
  };

  useEffect(() => {
    // 종류 선택에 따라 기능 옵션 업데이트
    setFunctions(typeToFunctions[selectedType] || []);
  }, [selectedType]);



  // 가격 입력 핸들러
  const handlePrice = (event) => {
    // 사용자가 입력한 값에서 숫자가 아닌 문자를 모두 제거
    const inputPrice = event.target.value.replace(/[^0-9]/g, ''); // 숫자가 아닌 문자를 제거합니다.
    setPrice(inputPrice/*+ '원'*/);
  };

  // 특이사항 유무를 위한 핸들러
  const handleFeatureButtonClick = (feature) => {
    setSelectedFeature(feature);
  };

  // 해시태그 입력 핸들러
  const handleHashtagChange = (event, index) => {
    const value = event.target.value.startsWith('#') ? event.target.value : `#${event.target.value}`;
    const newHashtags = [...hashtags];
    newHashtags[index] = value.slice(0, 11); // '#' 포함 최대 11자
    setHashtags(newHashtags);
  };
  

  // 해시태그 추가 핸들러
  const handleAddHashtag = () => {
    if (hashtags.length < 5) { // 해시태그 최대 5개 제한
      setHashtags([...hashtags, '#']); // 새 해시태그 기본값으로 '#' 설정
    }
  };
  

    // 해시태그 삭제 핸들러
  const handleRemoveHashtag = (index) => {
    const newHashtags = hashtags.filter((_, i) => i !== index);
    setHashtags(newHashtags);
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        {/* 거래지역 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
          <p style={{ fontSize: '20px' }}>거래 지역</p>
        </div>
        {/* 악기상태 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
          <p style={{ fontSize: '20px' }}>악기 상태</p>
        </div>
        {/* 종류 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
          <p style={{ fontSize: '20px' }}>종류</p>
        </div>
        {/* 기능 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
          <p style={{ fontSize: '20px' }}>기능</p>
        </div>
        {/* 가격 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
          <p style={{ fontSize: '20px' }}>가격</p>
        </div>
        {/* 특이사항 유무 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
          <p style={{ fontSize: '20px' }}>특이사항 유무</p>
        </div>
        {/* 해시태그 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
          <p style={{ fontSize: '20px' }}>해시태그(선택)</p>
        </div>
      </div>


      {/* 옵션들 */}
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '200px' }}>
        {/* 거래지역 드롭다운 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
          <select style={{ width: '100px', height: '40px', borderRadius: '3px' }}>
            {Sido && Sido.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <select style={{ width: '100px', height: '40px', borderRadius: '3px' }}>
            {Sido && Sido.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <select style={{ width: '100px', height: '40px', borderRadius: '3px' }}>
            {Sido && Sido.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
        </div>
        {/* 악기상태 버튼 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '25px' }}>
          <Button
            label="1단계"
            isSelected={selectedState === '1단계'}
            onClick={() => handleButtonClick('1단계')}
          />
          <Button
            label="2단계"
            isSelected={selectedState === '2단계'}
            onClick={() => handleButtonClick('2단계')}
          />
          <Button
            label="3단계"
            isSelected={selectedState === '3단계'}
            onClick={() => handleButtonClick('3단계')}
          />
          <Button
            label="4단계"
            isSelected={selectedState === '4단계'}
            onClick={() => handleButtonClick('4단계')}
          />
          <Button
            label="5단계"
            isSelected={selectedState === '5단계'}
            onClick={() => handleButtonClick('5단계')}
          />
          <div style={{ marginTop: '10px', marginLeft: '20px' }}>
            <PopupButton onClick={openPopup} isPopupOpen={isPopupOpen} closePopup={closePopup} popupData={popupData} />
          </div>
        </div>
        {/* 종류 드롭다운 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '25px' }}>
          <select style={{ height: '40px', borderRadius: '3px' }}
            value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="">선택해주세요</option>
            <option value="기타">기타</option>
            <option value="베이스">베이스</option>
            <option value="멀티">멀티</option>
            <option value="페달보드">페달보드</option>
          </select>
        </div>
        {/* 기능 드롭다운 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '25px' }}>
          <select style={{ height: '40px', borderRadius: '3px' }}>
            {functions.length > 0 ? (
              functions.map((functions, index) => <option key={index}>{functions}</option>)
            ) : (
              <option>먼저 종류를 선택해주세요</option>
            )}
          </select>
        </div>
        {/* 가격입력칸 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '25px' }}>
          <input
            type="text" value={price} onChange={handlePrice} 
            placeholder="숫자만 기입해주세요"
            style={{ width: '200px', height: '40px', borderRadius: '3px',
              border: '1px solid black', padding: '10px' }}
          />
          <span style={{ margin: '10px' }}>원</span>
        </div>
        {/* 특이사항 유무 버튼 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '25px' }}>
          <Button
            label="O"
            isSelected={selectedFeature  === 'O'}
            onClick={() => handleFeatureButtonClick('O')}
          />
          <Button
            label="X"
            isSelected={selectedFeature  === 'X'}
            onClick={() => handleFeatureButtonClick('X')}
          />
          <p style={{ margin: '5px', marginLeft: '10px' }}>특이사항에 대한 상세 내용은 본문에 기입해주세요</p>
        </div>
        {/* 해시태그 입력칸 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '25px' }}>
          {hashtags.map((hashtag, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginRight: '5px' }}>
              <input
                type="text"
                value={hashtag}
                onChange={(event) => handleHashtagChange(event, index)}
                placeholder="해시태그 입력"
                style={{width: '170px', height: '40px', borderRadius: '3px', border: '1px solid black' }}
              />
              <button onClick={() => handleRemoveHashtag(index)} style={{ height: '40px', width: '25px', marginLeft: '5px' }}>-</button>
            </div>
          ))}
          {hashtags.length < 5 && (
            <button onClick={handleAddHashtag} style={{ height: '40px' }}>+</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Effector;
