import  AsyncStorage  from "@react-native-community/async-storage";
export const USER_ID="uid"
export const NUMBER="number"
export const DETAILS_ENTERED="detaisl_entered"
export const USER_NAME="uname"


export const onSignIn = (uid,number) => {
  AsyncStorage.setItem(USER_ID, uid.toString());
  AsyncStorage.setItem(NUMBER, number.toString());
}
export const onDetailsEnter = (uname) => {
  AsyncStorage.setItem(USER_NAME, uname.toString());
}
export const onUserNameUpdate = (uname) => {
  AsyncStorage.setItem(USER_NAME, uname.toString());
}
export const onDetailsEntered = () => AsyncStorage.setItem(DETAILS_ENTERED, "true");

export const onSignOut = ()=>{
   AsyncStorage.removeItem(USER_ID);
   AsyncStorage.removeItem(DETAILS_ENTERED);
}



export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
      // console.log(USER_ID)
    AsyncStorage.getItem(USER_ID)
      .then(res => {
          console.log(res);
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(function(err) 
          {   reject(err)});
  });
};

export const saveChat = (id,message) => {
  AsyncStorage.getItem(id)
      .then(res => {
        if (res !== null) {
          let a=JSON.parse(res);
          a.push(message);
          AsyncStorage.setItem(id, JSON.stringify(a));
        }
        else
        {
          let a=[];
          a.push(message);
          AsyncStorage.setItem(id, JSON.stringify(a));
        }
      })
      .catch(function(err) 
          {   console.log(err)});
}

export const saveChatList = async(id,data) => {

  console.log(data);
  console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG");
  console.log(data.message);
  let lastChat="";
  if(data.message!==undefined)
  {
    console.log(1);
      lastChat=data.message.substring(0,20);
    console.log(2);
  }
  else if(data.imageUrl!==undefined)
  {
      lastChat="Photo";
  }
  let a={
      mesaage:lastChat,
      date:data.Date
  }

  AsyncStorage.getItem(id+"chatPrev")
      .then(async(res) => {
        console.log(res);
        console.log("WWKWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
        if (res !== null) {
          let ress={
            count:res.count+1,
            lastMessage:a.message,
            date:a.date
          }
          console.log("notdone");
          AsyncStorage.setItem(id+"chatPrev", JSON.stringify(ress));
          console.log("done");
        }
        else
        {
          let ress={
            count:1,
            lastMessage:a.message,
            date:a.date
          }
          AsyncStorage.setItem(id+"chatPrev", JSON.stringify(ress));
          AsyncStorage.getItem("chats").then(async(res1) => {
            if (res1 !== null) {
              let listOfChat=JSON.parse(res1);
              listOfChat.push(id);
              AsyncStorage.setItem("chats", JSON.stringify(listOfChat));
              console.log("done")
            }
          })
        }
      })
      .catch(function(err) 
          {   console.log(err)});
}
export const getChatList = async() => {
  return new Promise((resolve, reject) => {
      // console.log(USER_ID)
    AsyncStorage.getItem("chats")
      .then(res => {
        if (res !== null) 
        {
          let list=JSON.parse(res);
          let chats=[];
          for(let i=0;i<list.length;i++)
          {
            let item=AsyncStorage.getItem(list[i]+"chatPrev");
            let result=JSON.parse(item);
            chats.push(result);
          }
          resolve(chats);
        }
        else
        {
          resolve(null);
        }
      })
      .catch(function(err) 
          {  reject(err)});
  });
}
export const getchats = (id) => {
  return new Promise((resolve, reject) => {
      // console.log(USER_ID)
    AsyncStorage.getItem(id)
      .then(res => {
        if (res !== null) {
          resolve(res);
        }
        else
        {
          resolve(null);
        }
      })
      .catch(function(err) 
          {  reject(err)});
  });
};


export const isDetailsEntered = () => {
  return new Promise((resolve, reject) => {
      // console.log(USER_ID)
    AsyncStorage.getItem(DETAILS_ENTERED)
      .then(res => {
          console.log(res);
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(function(err) 
          {   reject(err)});
  });
};

export const getUserId = () => {
  return new Promise((resolve, reject) => {
      // console.log(USER_ID)
    AsyncStorage.getItem(USER_ID)
      .then(res => {
        if (res !== null) {
          resolve(res);
        }
      })
      .catch(function(err) 
          {   reject(err)});
  });
};
export const getUserName = () => {
  return new Promise((resolve, reject) => {
      // console.log(USER_ID)
    AsyncStorage.getItem(USER_NAME)
      .then(res => {
        if (res !== null) {
          resolve(res);
        }
      })
      .catch(function(err) 
          {   reject(err)});
  });
};
export const getNumber = () => {
  return new Promise((resolve, reject) => {
      // console.log(USER_ID)
    AsyncStorage.getItem(NUMBER)
      .then(res => {
        if (res !== null) {
          resolve(res);
        }
      })
      .catch(function(err) 
          {   reject(err)});
  });
};