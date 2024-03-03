
//let ToDoList=[{name:"todo",date:"2024/03/03",id:0},{name:"todo2",date:"2024/03/03",id:1},{name:"todo3",date:"2024/03/02",id:2}];
//localStorage.setItem('ToDoList', JSON.stringify(ToDoList));

let addDay=0;
let ToDoList = JSON.parse(localStorage.getItem('ToDoList') || '[]');

console.log(ToDoList[0].name);

function NowDate(i) {

if (i==0) addDay=0;

addDay+=i;

let date = new Date();
date.setDate(date.getDate() + addDay);

let year = date.getFullYear();
let month = ('0' + (date.getMonth() + 1)).slice(-2);
let day = ('0' + date.getDate()).slice(-2);

let formattedDate = year + '/' + month + '/' + day;

return formattedDate;

}

function FilterDate(CurrentDate,toDoDate) {

return CurrentDate==toDoDate;

}

class ToDo extends React.Component {

 constructor(props) {
    super(props);
    this.state = {
      id:0
    };
}

ClickHandle(id) {
alert(ToDoList[id].name);
}

  render() {
    return React.createElement('a', { onClick: () => this.ClickHandle(this.props.id),className:"todo",herf:"#"}, ToDoList[this.props.id].name);
  }
}

class ToDoListBox extends React.Component {

 constructor(props) {
    super(props);
    this.state = {
      CurrentDate:0
    };
}

  render() {

 let buttons = [
            React.createElement(btn, { num: 0, text: "今日" }),
            React.createElement(btn, { num: 1, text: "１日後" }),
            React.createElement(btn, { num: -1, text: "１日前" })
        ];

        let elements = [
            React.createElement('h3', null, this.props.CurrentDate + 'の予定')
        ];

        for (let i = 0; i < ToDoList.length; i++) {
            if (!FilterDate(this.props.CurrentDate, ToDoList[i].date)) continue;
            elements.push(React.createElement(ToDo, { id: ToDoList[i].id }));
            elements.push(React.createElement('br'));
        }

        return React.createElement('div', null,
            React.createElement('ul', null, buttons),
            React.createElement('div', { className: "scrollable-box" },
            React.createElement('div', null, elements)),
            React.createElement(TextArea)

        );
    }
}

class btn extends React.Component {

 constructor(props) {
    super(props);
    this.state = {
      num:0,
      text:""
    };
}

ClickHandle(i) {

    dispToDo(NowDate(i))
  
  }

  render() {
    return React.createElement('button', { onClick: () => this.ClickHandle(this.props.num),className:"btn"},this.props.text);
  }
}

class TextArea extends React.Component {

 constructor(props) {
    super(props);
    this.state = {
      name:""
    };

 }

  render() {
    return React.createElement('ul', { className:"ul2" });
  }

}


function dispToDo(CurrentDate) {

console.log(CurrentDate);

React.render(React.createElement(ToDoListBox,{CurrentDate:CurrentDate}),document.getElementById('root'));   
  
}

dispToDo(NowDate(0));
 



/*class toDoList extends React.Component {

 constructor(props) {
    super(props);
    this.state = {
      CurrentDate:0
    };
}

  render() {
    const elements = [];

    elements.push(React.createElement('h3',null,"　　　　　　　　　"+this.props.CurrentDate+'の予定'));

    for(var i=0;i<ToDoList.length;i++) {
    if (!FilterDate(this.props.CurrentDate,ToDoList[i].date)) continue; 

    elements.push(React.createElement(ToDo,{id:ToDoList[i].id}));
    elements.push(React.createElement('br'));

    }

    return React.createElement('div',null,elements);
  }

}
*/
