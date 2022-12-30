// step1. 요구사항 분석
//에스프레소 메뉴에서 새로운 메뉴를 확인 버튼 또는 엔터키 입력으로 추가한다.
    //메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
    //사용자 입력값이 빈 값이라면 추가되지 않는다.
//총 메뉴 갯수를 count하여 상단에 보여준다.
    //확인 버튼을 누를 때마다 갯수가 추가된다.
//메뉴의 수정 버튼을 눌러 메뉴 이름을 수정할 수 있다.
    //메뉴 수정시 브라우저에서 제공하는 'promt' 인터페이스를 활용한다.
//메뉴 삭제 버튼을 이용하여 메뉴를 삭제할 수 있다.
    //매뉴 삭제 시 브라우저에서 제공하는 'confirm; 인터페이스를 활용한다.


//요구사항 구현을 위한 전략 -> 무엇을 먼저 구현할 것인가?
//TODO 메뉴 추가
    //[x]메뉴의 이름을 입력 받고 확인 버튼을 누르면 메뉴가 추가된다.
    //[x]메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
    //[]총 메뉴 갯수를 count하여 상단에 보여준다.
    //[]메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
    //[]사용자 입력값이 빈 값이라면 추가되지 않는다.

//TODO 메뉴 수정
    //메뉴의 수정 버튼클릭 이벤트를 받고, 메뉴 수정하는 모달창이 뜬다.
    //- 'promt' 인터페이스를 통해 신규메뉴명을 입력받고, 확인버튼을 누르면 메뉴가 업데이트된다.

//TODO 메뉴 삭제   
    //메뉴 삭제 버튼클릭 이벤트를 받고, 메뉴를 삭제 컨펌 모달창이 뜬다.
    //-'confirm' 인터페이스를 통해 삭제를 할 건지 확인하고 확인버튼을 누르면 메뉴가 사라진다.


    const $input = document.querySelector("#espresso-menu-name")
    const $submitBtn = document.querySelector("#espresso-menu-submit-button")
    const $form = document.querySelector("#espresso-menu-form")
    const $menuList = document.querySelector("#espresso-menu-list")
    let newMenu;



    $form.addEventListener('submit',(e)=>{
        e.preventDefault(); 
    })


    function addMenu(){
        const menuItemTemplate = (newMenu) => {
            return `<li class ="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${newMenu}</span>
            <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
            <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
            </li>`;
        }   

        const addMenuName = ()=>{
            newMenu = $input.value;
            $menuList.insertAdjacentHTML('beforeend',menuItemTemplate(newMenu));
            $input.value = '';
        }

        $input.addEventListener('keypress',(e)=>{ 
            if(e.keyCode == 13){
                addMenuName();
            };
        })

        $submitBtn.addEventListener('click',(e)=>{
            addMenuName();
        })
    }
    addMenu();

