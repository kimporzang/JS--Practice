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
    //[x]총 메뉴 갯수를 count하여 상단에 보여준다.
    //[x]메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
    //[x]사용자 입력값이 빈 값이라면 추가되지 않는다.

//TODO 메뉴 수정
    //[x]메뉴의 수정 버튼클릭 이벤트를 받고, 메뉴 수정하는 모달창이 뜬다.
    //-[x] 'promt' 인터페이스를 통해 신규메뉴명을 입력받고, 확인버튼을 누르면 메뉴가 업데이트된다.

//TODO 메뉴 삭제   
    //메뉴 삭제 버튼클릭 이벤트를 받고, 메뉴를 삭제 컨펌 모달창이 뜬다.
    //-'confirm' 인터페이스를 통해 삭제를 할 건지 확인하고 확인버튼을 누르면 메뉴가 사라진다.


    const $input = document.querySelector("#espresso-menu-name")
    const $submitBtn = document.querySelector("#espresso-menu-submit-button")
    const $form = document.querySelector("#espresso-menu-form")
    const $menuList = document.querySelector("#espresso-menu-list")
    const $count = document.querySelector(".menu-count")


    const store = {
        setLocalStrorage(menu) {
            localStorage.setItem("menu", JSON.stringify(menu));
        },
        getLocalStrorage(){
            return JSON.parse(localStorage.getItem("menu"));
        },
    };



    function MenuApp(){
        this.menu = []; //초기화해주는 이유는 배열이라는 타입이라는 걸 명시하기 위함, 어떤 형태로 데이터를 관리하겠다.
        this.init = () => {
            if(store.getLocalStrorage()){
                this.menu = store.getLocalStrorage();
                render();
            }
        }
 
        const render = () => {
            const template = this.menu.map((menuItem,index)=>{
                return `<li data-menu-id="${index}" class ="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
                <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
                <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
                </li>`;
            }).join("");
            $menuList.innerHTML = template; //한꺼번에 바꿔주기
            countMenu();
        }

        $form.addEventListener('submit',(e)=>{
            e.preventDefault(); 
        })

        const addMenuName = ()=>{
            if($input.value == ""){
                alert("메뉴를 입력해주세요")
                return;
            }
            const newMenu = $input.value;
            this.menu.push({ name: newMenu })
            store.setLocalStrorage(this.menu); //로컬스토리지에 저장
            render();
            $input.value = '';
        }

        const countMenu = ()=>{
              const $countMenu = $menuList.querySelectorAll("li").length;
              $count.innerText = `총 ${$countMenu}개`;
        }

        const editMenuName = (e)=>{
            const menuId = e.target.closest("li").dataset.menuId
            const $menuName = e.target.parentElement.querySelector(".menu-name") //버튼이 있는 리스트의 텍스트를 가져온다.
            const editMenuName = prompt("수정할 메뉴를 입력해주세요.",$menuName.innerText) // 수정된 메뉴의 값을 가져온다.
            $menuName.innerText = editMenuName; //queryselector를 이용해 메뉴 이름만 바꿔준다. 나머지 버튼들은 그대로
            this.menu[menuId].name = editMenuName;
            store.setLocalStrorage(this.menu);
        }
        
        const removeMenuName = (e)=>{
            if(confirm("정말로 삭제하시겠습니까?")){ //true confirm에서 확인버튼은 true, 취소 버튼은 false를 나타낸다.
                e.target.parentElement.remove();  //우리가 선택된 li리스트 항목을 삭제해줘.
            }
            countMenu();
        }

        //메뉴 입력 시 
        $input.addEventListener('keypress',(e)=>{ 
            if(e.keyCode !== 13){
                return
            };
            addMenuName();
        });
        $submitBtn.addEventListener('click',addMenuName)

        //수정 버튼 클릭 시 
        $menuList.addEventListener('click', (e)=>{
            if(e.target.classList.contains("menu-edit-button")){
                editMenuName(e);
            }
        })
        
        //삭제 버튼 클릭 시
        $menuList.addEventListener('click', (e)=>{
                if(e.target.classList.contains("menu-remove-button")){
                    removeMenuName(e);
                }
        });
    }   
    const app = new MenuApp();
    app.init();