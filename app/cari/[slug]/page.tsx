import React from 'react';
async function getData(param:string){
    const res = await fetch('https://api.github.com/users/adykidd')
    console.log(res);
    return res.json
}
export default async function DetailCari({params}:{params:{slug:string}}){
    const data = await getData(params.slug);
    console.log(data);
    return (
        <div>
           <p> detail: {params.slug}</p>
           <p>
            {JSON.stringify(data)}
           </p>
        </div>
    )
}