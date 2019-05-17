import React from "react";

const InfoBlock = props => {
  console.log(props);
  const { gameRecord } = props.info;
  const children = [];
  console.log(gameRecord);

  //   const {flag, country, capital, region, language, population, idLs } = gameRecord;

  for (let item of gameRecord) {
    const {
      flag,
      country,
      capital,
      region,
      language,
      population,
      id,
      idLs
    } = item;
    children.push(
      <div>
        <div className="country-flag">
          <div>{country}</div>
          <div>
            <img src={flag} alt="flag" />
          </div>
        </div>
        <div className="country-basic-info">
          <div className="capital">Capital: {capital}</div>
          <div className="region">Region: {region}</div>
          <div className="language">Language: {language}</div>
          <div className="population">Capital: {population}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="info-block">
      {children}
      {/* <div className='country-flag'>
      <div>{country}</div>
      <div><img src={flag} alt="flag"/></div>
    </div>
    <div className='country-basic-info'>
        <div className='capital'>Capital: {capital}</div>
        <div className='region'>Region: {region}</div>
        <div className='language'>Language: {language}</div>
        <div className='population'>Capital: {population}</div>
    </div> */}
    </div>
  );
};

export default InfoBlock;

{
  /* <div className='info-block'>
  <div className='country-flag'>
    <div>{country}</div>
    <div><img src={flag} alt="flag"/></div>
  </div>
  <div className='country-basic-info'>
      <div className='capital'>Capital: {capital}</div>
      <div className='region'>Region: {region}</div>
      <div className='language'>Language: {language}</div>
      <div className='population'>Capital: {population}</div>
  </div>
</div> */
}
