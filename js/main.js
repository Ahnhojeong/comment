window.addEventListener('DOMContentLoaded', function () {
    // login modal popup
    localStorage.login = 'logout'; // 초기화면

    const write = document.querySelector('.comment_write_box');
    const loginModal = document.querySelector('.login_wrap');
    const modalCloser = document.querySelector('.modal_closer_btn');
    
    //console.log(document.querySelector('.wbox_profile_name').innerText == '로그인을 해주세요.');

    write.addEventListener('click',function(e){
        if(document.querySelector('.wbox_profile_name').innerText == '로그인을 해주세요.' && localStorage.login == 'logout'){
            loginModal.classList.add('open');
        }
    });
    
    modalCloser.addEventListener('click',function(){
        loginModal.classList.remove('open');
    });

    // sns login
    const snsLogin = document.querySelectorAll('.sns_login_box');
    const userName = document.querySelector('.wbox_profile_name');
    const writeGuide = document.querySelector('.wbox_text');


    if(localStorage.login == 'logout'){
        writeGuide.disabled = true;
    }

    for(var i=0; i<snsLogin.length; i++){
        snsLogin[i].addEventListener('click',function(){
            localStorage.login = 'success';
            login();
        })
    }

    function login(){
        loginModal.classList.remove('open');
        userName.innerHTML = '로그인 완료';
        userName.style.color = '#f00';
        writeGuide.placeholder = '주제와 무관한 댓글이나 악플은 경고조치 없이 삭제되며, 징계의 대상이 될 수 있습니다.';
        writeGuide.disabled = false;
        register.disabled = false;
    }

    // sns 로그인에 따른 사용자 구분
    const naver = document.querySelector('.naver');
    const kakao = document.querySelector('.kakao');
    const facebook = document.querySelector('.facebook');
    const google = document.querySelector('.google');
    const twitter = document.querySelector('.twitter');

    naver.addEventListener('click',function(){localStorage.snsId = '0'});
    kakao.addEventListener('click',function(){localStorage.snsId = '1'});
    facebook.addEventListener('click',function(){localStorage.snsId = '2'});
    google.addEventListener('click',function(){localStorage.snsId = '3'});
    twitter.addEventListener('click',function(){localStorage.snsId = '4'});

    

    // date
    function writeDate(){
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const hour = date.getHours();
        const min = date.getMinutes();

        const time = year + '-' + month + '-' + day + '-' + hour + ':' + min;
        return time;
    }

    // user name
    function UserName (){
        const nickname = 'abcdefghijklmnopqrstuvwxyz';
        var makeUserName = '';
        for(var i=0; i<4; i++){
            var index = Math.floor( Math.random(10) * nickname.length );
            makeUserName += nickname[index];
        }
        for(var j=0; j<4; j++){
            makeUserName += "*";
        }
        return makeUserName;
    }

    // 공통 변수
    const writeTextarea = document.querySelector('.wbox_text');
    const topCommentCount = document.querySelector('.comment_count');
    const commentList = document.querySelector('.comments_content_list');
    const voteUp = document.querySelector('.like');
    const voteDown = document.querySelector('.unlike');
    
    // vote
    

    // new write comment
    let idCountList = [];

    function writeComment(comments) {
        // 금지어
        let badWords = ['비속어','나쁜말','바보'];
        if( badWords.includes(comments) ){
            filter(comments);
        }else if( preMsg.includes(comments) ){
            plaster(comments);
        }else{
        // 댓글 등록할 때마다 html 추가
        const commentLi = document.createElement('li'); // comments_content
        const commentDiv = document.createElement('div'); //comments_contnet_box
        const commentUserDiv = document.createElement('div'); //con_user
        const commenetUserId = document.createElement('span'); //con_user_id
        const commentText = document.createElement('div'); //con_user_txt
        const commentTxtSpan = document.createElement('span'); // con_user_textarea
        const writeInfo = document.createElement('div'); // con_user_info
        const writeinfoDate = document.createElement('div'); // con_write_date
        const writenowDate = document.createElement('span'); // con_write_now_date
        const voteTools = document.createElement('div'); // con_write_tool
        const voteA = document.createElement('a'); // vote
        const voteA2 = document.createElement('a'); // vote unlike
        const voteLike = document.createElement('span'); // likeThumb
        const voteLikeEm = document.createElement('em'); // likeUp
        const voteHate = document.createElement('span'); // unlikeThumb
        const voteHateEm = document.createElement('em'); // likeDown

        const modifyBtn = document.createElement('div'); // modify_wrap
        const modifyA = document.createElement('a'); //modify
        const deleteA = document.createElement('a'); //delete
        const modifySpan = document.createElement('span'); //modify_txt
        const deleteSpan = document.createElement('span'); //delete_txt

        const newId = idCountList.length+1; // 각 댓글에 달린 id
        commentTxtSpan.id = newId;
        commenetUserId.id = newId;
        modifySpan.id = newId;

        // 태그에 클래스명 추가
        commentLi.className = 'comments_content';
        commentDiv.className = 'comments_contnet_box';
        commentUserDiv.className = 'con_user';
        commenetUserId.className = 'con_user_id';
        commentText.className = 'con_user_txt';
        commentTxtSpan.className = 'con_user_textarea';
        writeInfo.className = 'con_user_info';
        writeinfoDate.className = 'con_write_date';
        writenowDate.className = 'con_write_now_date';
        voteTools.className = 'con_write_tool';
        voteA.className = 'vote';
        voteA2.className = 'vote';
        voteLike.className = 'likeThumb';
        voteLikeEm.className = 'likeUp';
        voteHate.className ='unlikeThumb';
        voteHateEm.className = 'likeDown';

        modifyBtn.className = 'modify_wrap';
        modifyA.className = 'modify';
        deleteA.className = 'delete';
        modifySpan.className = 'modify_txt';
        deleteSpan.className = 'delete_txt';

        // 만들어진 태그 구조화 
        commentLi.appendChild(commentDiv);
        commentDiv.appendChild(commentUserDiv);
        commentUserDiv.appendChild(commenetUserId);
        commentUserDiv.appendChild(modifyBtn);
        modifyBtn.appendChild(modifyA);
        modifyBtn.appendChild(deleteA);
        modifyA.appendChild(modifySpan);
        deleteA.appendChild(deleteSpan);
        modifySpan.innerText = '수정';
        deleteSpan.innerText = '삭제';

        commentDiv.appendChild(commentText);
        commentText.appendChild(commentTxtSpan);
        commentTxtSpan.innerText = comments;
  
        

        commentDiv.appendChild(writeInfo);
        writeInfo.appendChild(writeinfoDate);
        writeinfoDate.appendChild(writenowDate);

        writeInfo.appendChild(voteTools);
        voteTools.appendChild(voteA);
        voteTools.appendChild(voteA2);
        
        voteA.appendChild(voteLike);
        voteLike.innerHTML = '<i class="far fa-thumbs-up"></i>';
        voteA.appendChild(voteLikeEm);
        voteLikeEm.innerHTML = '0';

        voteA2.appendChild(voteHate);
        voteHate.innerHTML = '<i class="far fa-thumbs-down">';
        voteA2.appendChild(voteHateEm);
        voteA2.classList.add('unlike');
        voteHateEm.innerHTML = '0';


        // 닉네임 만들어 뿌리기
        commenetUserId.innerHTML = UserName();
        
        // 댓글 남긴 시간 뿌리기
        writenowDate.innerHTML = writeDate();

        // 댓글 뿌리기
        const commentList = document.querySelector('.comments_content_list');
        commentList.prepend(commentLi);

        // 댓글 도배 방지
        plaster(comments);

        // 아이디에 따른 수정값
        let idAccordingToModify = {
            "commentId" : newId,
            "commentValue" : comments
        }
        
        idCountList.push(idAccordingToModify);
        console.log(idCountList);

        initIdCount();

        modifyA.addEventListener('click',modifyComments);
        deleteA.addEventListener('click',deleteComment);
        voteA.addEventListener('click',function(){
            this.lastChild.innerHTML++;
        });
        voteA2.addEventListener('click',function(){
            this.lastChild.innerHTML++;
        });
        }
        
    }



    // comment 등록
    function submit(){
        const writeVal = writeTextarea.value;
        console.log(writeVal);

        if( !writeVal.length ){
            alert("댓글을 입력해주세요");
        }else{
            //댓글 작성
            writeComment(writeVal);
            writeTextarea.value = '';
            topCommentCount.innerHTML++;
        }
    }

    
    const register = document.querySelector('.wbox_submit_btn');
    register.disabled = true;
    register.addEventListener('click',submit);


    // comment 삭제
    function deleteComment(e){
        const thisBtn = e.target;
        const commentItem = thisBtn.parentNode.parentNode.parentNode.parentNode.parentNode; // comments_content
        console.log(commentItem);

        for(var i=0; i<idCountList.length; i++){
            if(idCountList[i]["commentId"].toString() == thisBtn.parentNode.parentNode.parentNode.firstChild.id ){
                idCountList.splice(thisBtn.parentNode.parentNode.parentNode.firstChild.id-1, 1);
            }
        }

        commentList.removeChild(commentItem);

        // 상단 댓글수 카운트
        if(topCommentCount.innerHTML <= '2'){
            topCommentCount.innerHTML == '2';
        }else{
            topCommentCount.innerHTML--;
        }
    }

    // 금지어
    function filter(comments){
        let badWords = ['비속어','나쁜말','바보'];
        console.log( badWords.includes(comments) );
        for(var i=0; i<badWords.length; i++){
            if( comments.indexOf(badWords[i]) != -1 ){
                alert('비속어를 사용하지 말아주세요.');
                break;
            }
        } 
    }

    // 도배방지
    let preMsg = [];
    function plaster(curMsg){
        console.log( preMsg.includes(curMsg) );
        console.log(preMsg)
        if(preMsg == curMsg){
            alert('동일한 내용의 댓글 도배를 멈춰주세요.')
            return;
        }
        preMsg = curMsg;
    }


    // comment 수정

    function modifyComments(e){
        const modifyModal = document.querySelector('.modify_modal');
        const modifyText = document.querySelector('.modify_modal_txt');
        const modifyOk = document.querySelector('.modify_ok');
        const modifyCancle = document.querySelector('.modify_cancle');
        
        const modify = e.target;
        console.log(modify);
        modifyOk.id = "ok";
        modifyCancle.id = "cancle";
        modifyText.id = "modifyVal";

        modifyModal.classList.add('open');

        modifyCancle.addEventListener('click',function(){
            modifyModal.classList.remove('open');
        });


        modifyOk.addEventListener('click',function(e){
            console.log(modify.parentNode.parentNode.parentNode.parentNode.children[1].firstChild); // 댓글내용
            console.log( modify.parentNode.parentNode.parentNode.firstChild ); // 유저 아이디
            console.log(idCountList[0]["commentId"].toString()); // 댓글쓴 아이디 index
            
            for(var i=0; i<idCountList.length; i++){
                if( idCountList[i]["commentId"].toString() == modify.parentNode.parentNode.parentNode.firstChild.id ){
                    idCountList[i]["commentValue"] = modifyText.value;
                    let badWords = ['비속어','나쁜말','바보'];
                    if( badWords.includes(modifyText.value) ){
                        filter(modifyText.value);
                    }else{
                        modify.parentNode.parentNode.parentNode.parentNode.children[1].firstChild.innerHTML = modifyText.value;
                        modifyModal.classList.remove('open');
                    }
                }
            }
        });

    }

    // id값 초기화 (삭제시)
    function initIdCount(){
        for(var i=0; i<idCountList.length; i++){
            if( idCountList[i]["commentId"] - i > 1 ){
                idCountList[i]["commentId"] = idCountList[i]["commentId"] - (idCountList.length-(i+1));
            }
        }
    }

})

window.addEventListener('unload',function(){
    localStorage.clear();
})