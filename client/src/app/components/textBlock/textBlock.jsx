import React from 'react'
import style from './textBlock.module.sass'

const TextBlock = () => {
  return (
    <div className="container">
      <div className={style.description}>
        <div className="left">
          <div className={style.title}>
            Cel mai mare magazin online de obiecte sanitare europene din Moldova
          </div>
          <p>
            Acest magazin online face parte din Casa Design – și se adresează
            vânzărilor online de echipamente sanitare. Casa Design este un grup
            de tineri care au combinat mulți ani de experiență în vânzări, au
            fondat o companie care te poate ajuta calitativ să creezi un spațiu
            confortabil în baia ta. Parteneriatele cu principalii producători
            europeni de echipamente sanitare, logistică bine construită, ne
            permit să reducem timpul de livrare a mărfurilor comandate. În
            general, munca noastră are ca scop să facă confortul cooperării cu
            noi!
          </p>
        </div>
        <div className="right">
          <div className={style.title}>Întrebări frecvente</div>
          <ul>
            <li> Acest magazin online face parte din Casa Design? </li>
            <li> Casa Design este un grup de tineri care au combinat?</li>
            <li> Mulți ani de experiență în vânzări, au fondat o companie?</li>
            <li> Parteneriatele cu principalii producători europeni?</li>
            <li> Acest magazin online face parte din Casa Design? </li>
            <li> Casa Design este un grup de tineri care au combinat?</li>
            <li> Mulți ani de experiență în vânzări, au fondat o companie?</li>
            <li> Parteneriatele cu principalii producători europeni?</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TextBlock
