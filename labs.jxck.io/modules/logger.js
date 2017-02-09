console.log('load');
export default {
  log: (msg)=>{
    const $div = document.createElement('div');
    $div.textContent = msg;
    document.body.append($div);
  }
};
