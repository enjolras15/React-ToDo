        class ToDoApp extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    todos: [],
                    newTodo: ''
                };
                this.addTodo = this.addTodo.bind(this);
                this.toggleTodo = this.checkTodo.bind(this);
                this.deleteTodo = this.deleteTodo.bind(this);
            }

            componentDidMount() {
                const savedTodos = localStorage.getItem('ToDoList');
                if (savedTodos) {
                    this.setState({ todos: JSON.parse(savedTodos) });
                }
            }

            componentDidUpdate() {
                localStorage.setItem('ToDoList', JSON.stringify(this.state.todos));
            }

            addTodo() {
                const { newTodo, todos } = this.state;
                if (newTodo != '') {
                    todos[todos.length] = { id: todos.length, text: newTodo, completed: false };
                    this.setState({ todos: todos, newTodo: '' });
                }
            }

            checkTodo(id) {
                const { todos } = this.state;
                for (let i = 0; i < todos.length; i++) {

                    if (todos[i].id == id) todos[i].completed = !todos[i].completed;

                }

                this.setState({ todos: todos });
            }

            deleteTodo(id) {
                const { todos } = this.state;
                const updatedTodos = todos.filter(todo => todo.id !== id);
                this.setState({ todos: updatedTodos });
            }

            render() {
                const { todos, newTodo } = this.state;

                return (
                    React.createElement('div', null,
                        React.createElement('h1', null, 'ToDo List'),
                        React.createElement('input', {
                            type: 'text',
                            value: newTodo,
                            onChange: (event) => this.setState({ newTodo: event.target.value })
                        }),
                        React.createElement('button', { onClick: this.addTodo }, 'Add Todo'),
                        React.createElement('div', { className:'box' },
                            todos.map(todo =>
                                React.createElement('li', { key: todo.id },
                                    React.createElement('input', {
                                        type: 'checkbox',
                                        checked: todo.completed,
                                        onChange: () => this.checkTodo(todo.id)
                                    }),
                                    React.createElement('span', 
                                        null
                                    , todo.text),
                                    React.createElement('button', {
                                        onClick: () => this.deleteTodo(todo.id)
                                    }, 'Delete')
                                )
                            )
                        )
                    )
                );
            }
        }


    React.render(React.createElement(ToDoApp),document.getElementById('root'));   
  