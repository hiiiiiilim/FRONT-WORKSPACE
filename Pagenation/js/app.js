const images = [
    './img/img1.jpg',
    './img/img2.png',
    './img/img3.jpg',
    './img/img4.jpg',
    './img/img5.jpg',
];
const imagesPerpage = 2; //한페이지에 표시될 이미지 수 
let currentPage = 0 ; //현재페이지를 나타내는 변수, 초기값은 0으로 설정하여 첫번째 페이지를 표시함

const imageContainer = document.querySelector('.img-container');//이미지가 표시될 div공간
const prevButton = document.getElementById('prevPage');//이전버튼
const nextButton = document.getElementById('nextPage');//다음버튼

//이미지표시 함수의 시작
/*
    displayImg(page) : page는 현재 페이지 번호를 나타냄
                        호출될때마다 페이지를 전환하고 해당 페이지의 이미지를 표시하는데 사용
                        함수를 호출하는 공간에서 page값을 전달하면 함수는 해당페이지에 해당하는 이미지 표시
    displayImg(0) : 첫번째 페이지에 해당하는 이미지를 표시
    displayImg(1) : 두번째 페이지에 해당하는 이미지를 표시
*/
function displayImg(page){
    //현재 페이지번호('page')와 페이지당 이미지 수 (imagesPerpage)를 곱해서 시작인덱스를 계산
    //페이지 내에서 표시할 이미지의 첫번째 이미지 인덱스를 나타냄
    const startIndex = page * imagesPerpage;

    //시작 인덱스에 페이지당 이미지 수를 더해서 종료 인덱스를 계산
    //페이지 내에서 표시할 마지막 이미지 다음 인덱스를 나타냄
    const endIndex = startIndex + imagesPerpage;

    //시작인덱스에 페이지당 이미지 수를 더해서 종료 인덱스를 계산
    //페이지내에서 표시할 이미지의 마지막 이미지 다음 인덱스를 표시
    //이미지 배열('images')에서 시작 인덱스와 종료 인덱스 사이에 이미지를 추출해서 pageImages 배열에 저장
    //이 배열은 현재 페이지에 표시될 이미지들을 담고있음
    const pageImages = images.slice(startIndex, endIndex);

    imageContainer.innerHTML = ''; //이미지를 표시해줄 컨테이너 초기화
    
    //배열에 있는 이미지들을 반복해서 처리해주는 역할
    pageImages.forEach(images => { //각 이미지를 표시하기 위한 이미지 태그 요소를 생성
        const imgElement = document.createElement('img');
        //img 태그에서 src 속성을 images(현재 이미지 파일의 경로)로 설정
        imgElement.src = images;
        //<img> 태그에 image 클래스를 추가해서 추후 이미지 스타일을 적용할 예정
        imgElement.classList.add('image');
        imageContainer.appendChild(imgElement);
    });
}

//버튼 업데이트
function updateButtons(){
    /* 
        prevButton.disabled = 이전버튼 활성화 비활성화 시키는 기능을 나타냄
        첫번째 페이지일 경우에는 이전 버튼을 비활성화 시켜서
        첫번째 페이지 일 경우에는 이전 버튼을 클릭하지 못하게 막는다.
    */
    prevButton.disabled = currentPage === 0 ;

    /* 다음 버튼에서 마지막 페이지일 경우 이미지가 없을 때 더이상 
       다음 버튼이 눌리는 것을 방지하기 위해서 다음 버튼 또한 클릭하지 못하게 막음

        (currentPage + 1) * imagesPerpag : 다음 페이지에 해당하는 이미지의 첫번째 인덱스를 나타냄
        images.length : images의 배열의 길이로, 페이지를 넘어갈 수 있는 이미지의 전체 수를 나타냄
        (currentPage + 1) * imagesPerpag >= images.length; :  다음 페이지에 해당하는 이미지가 이미지 배열을 벗어나는지 확인
                                                             다음페이지에 이미지가 더 이상 없을 때 다음 버튼을 비활성화
    */
    nextButton.disabled = (currentPage + 1) * imagesPerpag >= images.length;
}   

prevButton.addEventListener('click', () => { //이전버튼에 대한 클릭이벤트, 사용자가 이전버튼을 클릭할 때 이 함수가 실행됨
    if(currentPage > 0){ //현재페이지 번호가 0보다 클 경우에만 실행
        currentPage--; //현재페이지 번호에서 하나를 감소시킴
        displayImg(currentPage); //새로운 현재 페이지에 해당하는 이미지를 표시, 덮어쓰기
        updateButtons(); // 이전 버튼이 첫 번째 페이지에서 클릭하게되면  더이상 이전버튼으로 가지 못하도록 비활성화 시킴
    }
});

nextButton.addEventListener('click', ()=>{
    //현재페이지에서 다음 페이지로 이동할 수 잇는지 확인
    /*
        currentPage 현재 페이지 번호
        imagesPerpage : 한페이지당 표시되는 이미지의 수 
        images.length : images 배열의 총 이미지 수 
    */
    if((currentPage + 1) *imagesPerpage < images.length){
        currentPage++; //현재 페이지의 번호를 하나 증가시켜 다음페이지로 이동하게함
        displayImg(currentPage);
        updateButtons();
    }
    
});

displayImg(currentPage);
updateButtons();