export default function Notes() {
  let inputDesc;
  let inputTitle;
  let notesList;
  let createNotesBtn;
  let noteBox;
  let selectedNote;
  let data;

  const generateListAndBindEvent = function (value) {
    const note = document.createElement('div');
    note.classList.add('notes__list__box');

    const noteContent = document.createElement('div');
    noteContent.classList.add('notes__list__box__content');
    // title
    const title = document.createElement('h4');
    title.classList.add(...['notes__list__title', 'truncate']);
    title.innerText = value.title;

    // delete btn
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'X';
    deleteBtn.classList.add('notes__list__delete');

    // description
    const desc = document.createElement('p');
    desc.classList.add(...['notes__list__content', 'truncate']);
    desc.innerText = value.content;
    noteContent.append(title);
    noteContent.append(desc);

    note.append(noteContent);
    note.append(deleteBtn);
    note.addEventListener('click', handleNoteClick);
    return note;
  };

  const storeData = () => {
    localStorage.setItem('data', JSON.stringify(data));
  };

  const handelCreateNote = () => {
    selectedNote = null;
    // const title = inputTitle.value;
    // const desc = inputDesc.value;
    // if (title && desc) {
    //   data.push({ title, content: desc });
    //   notesList.innerHTML = '';
    //   data.map(generateList).forEach((value) => notesList.append(value));
    //   storeData();
    //   selectedNote = notesList[notesList.length];
    // }
    inputTitle.value = '';
    inputDesc.value = '';
  };

  const handleNoteClick = function (e) {
    console.log('index', [...e.target.classList].indexOf('notes__list__delete'));

    if ([...e.target.classList].indexOf('notes__list__delete') > -1) {
      const index = [...e.target.parentElement.parentElement.children].indexOf(e.target.parentElement);
      data.splice(index, 1);
      notesList.innerHTML = '';
      console.log(data);
      data.map(generateListAndBindEvent).forEach((value) => notesList.append(value));
      storeData();
    } else {
      selectedNote = e.target;
      const title = e.target.querySelector('.notes__list__title').innerText;
      const desc = e.target.querySelector('.notes__list__content').innerText;
      inputTitle.value = title;
      inputDesc.value = desc;
    }
  };

  const handleBlur = function () {
    if (selectedNote) {
      selectedNote.querySelector('.notes__list__title').innerText = inputTitle.value;
      selectedNote.querySelector('.notes__list__content').innerText = inputDesc.value;
      const index = [...selectedNote.parentElement.children].indexOf(selectedNote);
      data[index] = { title: inputTitle.value, content: inputDesc.value };
      storeData();
    } else {
      const title = inputTitle.value;
      const desc = inputDesc.value;
      if (title && desc) {
        data.push({ title, content: desc });
        const note = generateListAndBindEvent({ title, content: desc });
        notesList.append(note);
        // notesList.innerHTML = '';
        // data.map(generateList).forEach((value) => notesList.append(value));
        storeData();
        selectedNote = notesList[notesList.length];
      }
    }
  };

  const initSelectorsAndEvents = (app) => {
    inputDesc = app.querySelector('.notes__preview__content');
    inputTitle = app.querySelector('.notes__preview__title');
    notesList = app.querySelector('.notes__list');
    createNotesBtn = app.querySelector('.notes__add__notes');
    noteBox = app.querySelectorAll('.notes__list__box');
    selectedNote = noteBox[0];

    // bind listeners
    // noteBox.forEach((value) => value.addEventListener('click', handleNoteClick));
    createNotesBtn.addEventListener('click', handelCreateNote);
    inputTitle.addEventListener('blur', handleBlur);
    inputDesc.addEventListener('blur', handleBlur);
  };

  function init() {
    const notesApp = document.createElement('div');
    notesApp.classList.add('notes');
    data = JSON.parse(localStorage.getItem('data'));

    // list of notes
    const list = document.createElement('div');
    list.classList.add('notes__list');
    data.map(generateListAndBindEvent).forEach((value) => list.append(value));

    // preview notes
    const preview = document.createElement('div');
    preview.classList.add('notes__preview');
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('notes__preview_header');
    const preTitle = document.createElement('input');
    preTitle.classList.add('notes__preview__title');
    preTitle.type = 'text';
    preTitle.placeholder = 'Enter note title';
    preTitle.value = data[0].title;

    // create button
    const btn = document.createElement('button');
    btn.classList.add('notes__add__notes');
    btn.innerText = 'Create Note';
    list.append(btn);
    headerDiv.append(preTitle);
    headerDiv.append(btn);

    const preContent = document.createElement('textarea');
    preContent.classList.add('notes__preview__content');
    preContent.placeholder = 'Add your notes here';
    preContent.value = data[0].content;
    preview.append(headerDiv);
    preview.append(preContent);

    // append on the app
    notesApp.append(list);
    notesApp.append(preview);
    initSelectorsAndEvents(notesApp);
    return notesApp;
  }

  return {
    init,
  };
}
