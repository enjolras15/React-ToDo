
//let ToDoList=[{name:"todo",date:"2024/03/03",id:0},{name:"todo2",date:"2024/03/03",id:1},{name:"todo3",date:"2024/03/02",id:2}];
//localStorage.setItem('ToDoList', JSON.stringify(ToDoList));

let addDay = 0;
let ToDoList = JSON.parse(localStorage.getItem('ToDoList') || '[]');


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

class Allcomponents extends React.Component {

 constructor(props) {
    super(props);
    this.state = {
       CurrentDate: 0,
        ClickedId: -1,
        state:0
    };
    }

FilterDate(CurrentDate, toDoDate) {

    return CurrentDate == toDoDate;

}

    ClickHandle(id) {
    this.setState({ ClickedId:id});
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
            if (!this.FilterDate(this.props.CurrentDate, ToDoList[i].date)) continue;
            elements.push(React.createElement('a', { onClick: () => this.ClickHandle(i), className: "todo", herf: "#" }, ToDoList[i].name));
            elements.push(React.createElement('br'));
        }

        return React.createElement('div', null,
            React.createElement('ul', null, buttons),
            React.createElement('div', { className: "scrollable-box" }, elements),
            React.createElement(TextArea, { CurrentDate: this.props.CurrentDate})

        );
    }
}

class btn extends React.Component {

 constructor(props) {
    super(props);
     this.state = {
         num: 0,
         text: ""
    };
    }

ClickHandle(i) {

    dispToDo(NowDate(i), -1);
  
  }

  render() {
    return React.createElement('button', { onClick: () => this.ClickHandle(this.props.num),className:"btn"},this.props.text);
  }
}

class TextArea extends React.Component {

 constructor(props) {
    super(props);
     this.state = {
      inputValue: '',
      textValue: '',
      CurrentDate: "",
    };

    }


    InputChangeHandle(event) {

        this.setState({ inputValue: event.target.value });
    }

    TextChangeHandle(event) {

        this.setState({ textValue: event.target.value });

    }



    ClickHandle(name) {

        ToDoList[ToDoList.length] = { name: this.state.inputValue, date: this.props.CurrentDate, id: ToDoList.length };
        this.setState({ inputValue: "" });
        this.setState({ textValue: "" });
        this.save();

    }

    save() {

        localStorage.setItem('ToDoList', JSON.stringify(ToDoList));
        dispToDo(this.props.CurrentDate, -1);
    }

    render() {

    let elements = [
         React.createElement('div', null, 'タイトル'),
         React.createElement('input', { value: this.state.inputValue, onChange: (event) => this.InputChangeHandle(event) }),
         React.createElement('br'),
         React.createElement('div', null, '詳細'),
         React.createElement('textarea', { value: this.state.textValue, onChange: (event) => this.TextChangeHandle(event) }),
         React.createElement('br'),
         React.createElement('button', { className: "btn", onClick: () => this.ClickHandle(this.props.id) }, "追加")
        ];

        return React.createElement('ul', { className: "ul2" }, elements);
  }

}


function dispToDo(CurrentDate,i) {

    React.render(React.createElement(Allcomponents,{CurrentDate:CurrentDate,ClikedId:i}),document.getElementById('root'));   
  
}

dispToDo(NowDate(0),-1);
 


    //Rename(event,i) {

    //    ToDoList[i].name = event.target.value;
    //    this.setState({ inputValue: event.target.value });
    //    dispToDo(this.props.CurrentDate, this.props.selectedToDo);
    //}

            //elements = [
            //    React.createElement('div', null, 'タイトル'),
            //    React.createElement('input', { value: ToDoList[this.props.selectedToDo].name, onChange: (event) => this.Rename(event, this.props.selectedToDo) }),
            //    React.createElement('br'),
            //    React.createElement('div', null, '詳細'),
            //    React.createElement('textarea', { value: this.state.textValue, onChange: (event) => this.TextChangeHandle(event) }),
            //    React.createElement('br'),
            //    React.createElement('button', { className: "btn", onClick: () => this.save() },"OK")
            //];
