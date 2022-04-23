import React from 'react'
import style from './footer.module.sass'

const linksStr =
  'Биде, Ванны, Душевые кабины, Инсталляции, Полотенцесушители, Раковины, Сливная арматура, Смесители, Унитазы'

const Footer = () => {
  const links = linksStr.split(',').map((link) => {
    link = link.trim()
    return (
      <a key={link} href="#" className={style.footer__links}>
        {link}
      </a>
    )
  })
  return (
    <div className="container">
      <div className={style.footer}>
        <div className={style.footer__wrapper}>
          <div className={style.footer__section}>
            <h3>Categorie Populare</h3>
            {links}
          </div>
          <div className={style.footer__section}>
            <h3>Categorie Populare</h3>
            {links}
          </div>
          <div className={style.footer__section}>
            <h3>Contacte</h3>
            <a href="tel:+37369888013">Тел: +373–69–888–013</a>
            <a href="mail:info@cd.md">Email: info@cd.md</a>
            <p>Adresa: Armeneasca 77, Chișinău</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
