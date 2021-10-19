function onSubmit(f) {
  if(f.msg.value.trim() === "") {
    alert(ERR.MSG_NULL);
    f.msg.focus();
    return false;
  }
  if(f.passwd) {
    if(f.passwd.value.trim() === "") {
      alert(ERR.PW_NULL);
      f.passwd.focus();
      return false;
    }
  }
  return true;
}