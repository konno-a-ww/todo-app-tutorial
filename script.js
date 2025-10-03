const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

// タスクを保存する配列
let tasks = [];
// タスクを追加する関数
const addTask = () => {
    const taskText = taskInput.value.trim();
    
    // 空の入力は無視
    if (!taskText) {
        alert('タスクを入力してください！');
        return;
    }
    
    // 新しいタスクオブジェクトを作成
    const newTask = {
        id: Date.now(), // 一意のIDとして現在時刻を使用
        text: taskText,
        completed: false
    };
    
    // 配列に追加
    tasks.push(newTask);
    
    // 入力欄をクリア
    taskInput.value = '';
    
    // 画面を更新
    renderTasks();
    
    // ローカルストレージに保存
    saveTasks();
};

const renderTasks = () => {
    // 一旦リストを空にする
    taskList.innerHTML = '';
    
    // 各タスクを表示
    tasks.forEach(task => {
        // リスト項目を作成
        const li = document.createElement('li');
        li.className = 'task-item';
        if (task.completed) {
            li.classList.add('completed');
        }
        
        // チェックボックスを作成
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleTask(task.id);
        
        // タスクテキストを作成
        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;
        
        // 削除ボタンを作成
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-button';
        deleteBtn.textContent = '削除';
        deleteBtn.onclick = () => deleteTask(task.id);
        
        // 要素を組み立てる
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        
        // リストに追加
        taskList.appendChild(li);
    });
};
const toggleTask = (id) => {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    
    renderTasks();
    saveTasks();
};
const deleteTask = (id) => {
    if (confirm('本当に削除しますか？')) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
        saveTasks();
    }
};
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// ローカルストレージから読み込み
const loadTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
};
// イベントリスナーを設定
addButton.addEventListener('click', addTask);

// Enterキーでも追加できるように
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// ページ読み込み時にタスクを読み込む
window.addEventListener('load', loadTasks);
