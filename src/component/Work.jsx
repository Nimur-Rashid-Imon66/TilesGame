import React from 'react';
import { useState } from 'react';
let gap = {};
const Work = () => {
    
    let [data, setData] = useState([
            {
                id: 1,
                size: {
                    rowspan: 1,
                    colspan: 1
                },
                pos: {
                    row: 0,
                    col: 0
                }
            },
            {
                id: 2,
                size: {
                    rowspan: 1,
                    colspan: 1
                },
                pos: {
                    row: 0,
                    col: 1
                }
            },
            {
                id: 3,
                size: {
                    rowspan: 1,
                    colspan: 1
                },
                pos: {
                    row: 1,
                    col: 0
                }
            },
            {
                id: 4,
                size: {
                    rowspan: 1,
                    colspan: 1
                },
                pos: {
                    row: 1,
                    col: 1
                }
        },
    //     {
    //         id: 2445,
    //         size: {
    //             rowspan: 1,
    //             colspan: 1
    //         },
    //         pos: {
    //             row: 2,
    //             col: 0
    //         }
    // },
            {
                id: 5,
                size: {
                    rowspan: 1,
                    colspan: 2
                },
                pos: {
                    row: 2,
                    col: 0
                }
        },
        {
            id: 6,
            size: {
                rowspan: 2,
                colspan: 1
            },
            pos: {
                row: 3,
                col: 0
            }
        },
        {
            id: 7,
            size: {
                rowspan: 2,
                colspan: 1
            },
            pos: {
                row: 3,
                col: 1
            }
        },
    ]);
    // const addNewData = (rs = 1, cs = 2) => {
    //     let newData = data.map((item) => {
    //         item.pos.row++;
    //     })
    //     newData.push({ id: data.length + 1, size: { rowspan: rs, colspan: cs }, pos: { row: 0, col: 0 } })
    //     setData(newData);
    // }
    // addNewData();
    const updateData = () => {
           for(let idx of data)
           {      
               let { row, col } = idx.pos
               let { colspan } = idx.size
               if (row == 0) continue;
               row--;
               let flag = 1;
               for (let j = 0; j < colspan; j++)
               {
                let key = (String(row)+','+String(col+j))
                   if (gap[key]===undefined) {
                       flag = 0; break;
                   }
               }  
               if (!flag) continue;
               for (let j = 0; j < colspan; j++){
                   let key = (String(row)+','+String(col+j))
                   delete gap[key]
               }
               makeGap(idx);
               idx.pos.row = row;
        }
    }

    const makeGap = (cell) => {
        let { row, col } = cell.pos
        let { rowspan, colspan } = cell.size
        if (row < 0 || col < 0) return;
        for (let i = 0; i < rowspan; i++)
        {
            for (let j = 0; j < colspan; j++)
            {
                let key = (String(row+i)+','+String(col+j))
                gap[key]=1; 
            }
        }
        updateData();
    }

    const handleRemove = (id, cell) => {
        let newData = data.filter(item => (item.id !== id))
        setData(newData)
        makeGap(cell)
        // while (gap.length) update();         
    }
    return (
        <div className='relative '>          
            {
                data.map((cell) => {
                    return (
                        <div
                            key={cell.id}
                            style={{
                            width: cell.size.colspan * 200 + 'px',
                            height: cell.size.rowspan * 200 + 'px',
                            top: cell.pos.row * 200  +'px',
                            left: cell.pos.col * 200 +'px',
                            }}
                            className={`absolute p-[10px]`}>
                            <div className='bg-black rounded-md  w-full h-full'>
                                <button
                                    onClick={() => { handleRemove(cell.id, cell) }} 
                                    className="bg-gray-600 text-sm" > remove
                                </button>
                            </div>

                        </div>
                    )})
            }
                {/* <button
                    className="absolute top-0 right-0   bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => { addNewData(1,2) }}>Add item
                </button> */}
        </div>
    );
};

export default Work;