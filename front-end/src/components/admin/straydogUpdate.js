import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import './StraydogDetail.css';



const StraydogUpdate = () => {

    // 강아지 아이디 받기
    const { id } = useParams()
    // ====================================================

    // 강아지 초기 정보 가져오기 
    const [dog, setDog] = useState({
        "DogID": 37,
        "Sex": "Female",
        "Age": 15,
        "ChipNumber": "123987654321",
        "Image": "http://example.com/dog5.jpg",
        "Breed": "SiGorJabJong",
        "RemainedDay": "150",
        "DogSize": "Large",
        "Weight": 123,
        "Status": "stray",
        "EnteredDay": null,
        "DiscoveredPlace": null,
        "LostLocation": "AnYang",
        "LostDate": "2023-02-08",
        "ReturnedHome": "Yes"
    });
    console.log('도그 아이디', id)
    useEffect(() => {
        const apiCall = async () => {
            const response = await axios.get(`/straydog/${id}`);
            console.log(response.data, '맞지?')
            setDog(response.data)
        }
        apiCall()

    }, [])
    // ===================================================

    // 강아지 정보 수정 시 변수들 수정 
    const [Sex, setSex] = useState(dog.Sex)
    const changeSex = event => {
        setSex(event.target.value);
        console.log(event.target.value)
      };
    const [Age, setAge] = useState(dog.Age)
    const changeAge = event => {
        setAge(event.target.value);
        console.log(event.target.value)
      };
    const [ChipNumber, setChipNumber] = useState(dog.ChipNumber)
    const changeChipNumber = event => {
        setChipNumber(event.target.value);
        console.log(event.target.value);
      };
    const [Image, setImage] = useState(dog.Image)
    const changeImage = event => {
        setImage(event.target.value);
        console.log(event.target.value);
      };
    const [Breed, setBreed] = useState(dog.Breed)
    const changeBreed = event => {
        setBreed(event.target.value);
        console.log(event.target.value);
      };
    const [RemainedDay, setRemainedDay] = useState(dog.RemainedDay)
    const changeRemainedDay = event => {
        setRemainedDay(event.target.value);
        console.log(event.target.value);
      };
    const [DogSize, setDogSize] = useState(dog.DogSize)
    const changeDogSize = event => {
        setDogSize(event.target.value);
        console.log(event.target.value);
      };
    const [Weight, setWeight] = useState(dog.Weight)
    const changeWeight = event => {
        setWeight(event.target.value);
        console.log(event.target.value);
      };
    const [Status, setStatus] = useState(dog.Status)
    const changeStatus = event => {
        setStatus(event.target.value);
        console.log(event.target.value);
      };
    const [EnteredDay, setEnteredDay] = useState(dog.EnteredDay)
    const changeEnteredDay = event => {
        setEnteredDay(event.target.value);
        console.log(event.target.value);
      };
    const [DiscoveredPlace, setDiscoveredPlace] = useState(dog.DiscoveredPlace)
    const changeDiscoveredPlace = event => {
        setDiscoveredPlace(event.target.value);
        console.log(event.target.value);
    }
    // ===================================================

    const navigate = useNavigate()
    // 업데이트 버튼 누르면 put 요청
    const Update = (e) => {
        // e.preventDefault();
        console.log(dog)
        console.log(typeof EnteredDay, 1)
        console.log(typeof Date(EnteredDay), 2)
        // PUT 요청
        axios.put(`/straydog/${id}`, JSON.stringify(
            {
            Sex: Sex,
            Age: Age,
            ChipNumber: ChipNumber,
            Image: Image,
            Breed: Breed,
            RemainedDay: RemainedDay,   
            DogSize: DogSize,
            Weight: Weight,
            Status: Status,
            EnteredDay: EnteredDay,
            DiscoveredPlace: DiscoveredPlace,
            LostLocation: null,
            LostDate: null,
            ReturnedHome: null
            }), { headers : {"Content-Type": 'application/json'}})
            .then(function (response) {
            console.log(response);
            navigate(`/straydog-detail/${id}`)
            })
            .catch(function (error) {
            console.log(error);
            });
        console.log('내가 가지고 있는것')
            
        }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '200px' }}>
            <h1>
                도그 수정 폼폼폼 미쳤다잇
            </h1>
            <hr/>
            <div style={{display : "flex"}}>
            <div >
                <div onChange={changeSex}>
                    성 별  
                    <input type="radio" name="theme" value="Male" id="male"/><label htmlFor="male">수컷</label>
                    <input type="radio" name="theme" value="Female" id="female"/><label htmlFor="female">암컷</label>
                </div>
                <div>   
                    <label htmlFor='age'> 추정 나이 </label><input id='age' type="number" onChange={changeAge}/>
                </div>
                <div>
                    <label htmlFor='chip_number'> 칩번호 </label><input id='chip_number' type="text" placeholder={dog.ChipNumber} onChange={changeChipNumber}/>
                </div>
                <div>
                    <label htmlFor='image'> 사 진 </label><input id='image' type="text" placeholder={dog.Image} onChange={changeImage}/>
                </div>
                <div>
                    <label htmlFor='breed'> 견 종 </label><input id='breed' type="text" placeholder={dog.Breed} onChange={changeBreed}/>
                </div>
                
                
                
            </div>
            <div>
                <div>
                    <label htmlFor='remained_day'> 남은 날짜 </label><input id='remained_day' type="number" placeholder={dog.RemainedDay} onChange={changeRemainedDay}/>
                </div>
                <div onChange={changeDogSize}>
                    크기
                    <input type="radio" name="size" value="small" id="small"/><label htmlFor="large">소형견</label>
                    <input type="radio" name="size" value="medium" id="medium"/><label htmlFor="large">중형견</label>
                    <input type="radio" name="size" value="large" id="large"/><label htmlFor="large">대형견</label>
                </div>
                <div>
                    <label htmlFor='weight'> 무 게 </label><input id='weight' type="number" placeholder={dog.Weight} onChange={changeWeight}/>
                </div>
                <div>
                    <label htmlFor='status'> 상 태 </label><input id='status' type="text" placeholder={dog.Status} onChange={changeStatus}/>
                </div>

            </div>
            </div>
            <hr/>
            {/* STRAY */}
            <div>
                <label htmlFor='entered_day'> 입소 날짜 </label><input id='entered_day' type="date" min="2000-01-01" max="2100-12-31" placeholder={dog.EnteredDay} onChange={changeEnteredDay}/>
                <label htmlFor='discovered_place'> 발견 장소 </label><input id='discovered_place' type="text" placeholder={dog.DiscoveredPlace} onChange={changeDiscoveredPlace}/>
            </div>

            <button style={{width : '100px', height : '100px'}} onClick={Update}>
                유기견 수정하기
            </button>
    </div>

    );
};


export default StraydogUpdate