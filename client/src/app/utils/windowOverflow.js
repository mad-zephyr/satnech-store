export default function setWindowOverflow(flag) {
  if (flag) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}
