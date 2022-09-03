import styled from "styled-components";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const TableUser = styled.div`
  width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;
const TableTd = styled.div`
  display: flex;
  width: 33.33%;
  background-color: #b3a6a6;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-overflow: ellipsis;
`;
const TableTdInfo = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  background-color: #ece4e4;
  border: 1px solid #959499;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    background-color: #cfc7c7;
    cursor: pointer;
  }
`;

const Pagination = styled.span`
  margin: 2px;
  font-size: 18px;
  &:hover {
    cursor: pointer;
  }
`;
const InputLink = styled.input``;
const TableBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const USERS_LIMIT = 10;

const TableUs = () => {
  const [usersInfo, setUsersInfo] = useState([]);
  const [allPageUser, setAllPageUser] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [nextP, setNextP] = useState(0);
  const [link, setlink] = useState("");
  const allPage = Math.ceil(allPageUser / 10);
  const arrayPage = [];
  const [sortBy, setSortBy] = useState("asc_short");
  for (let i = 0; i < allPage; i++) {
    arrayPage.push(i);
  }

  const changePage = (page) => {
    setCurrentPage(page);
    setNextP(page * USERS_LIMIT);
  };


  useEffect(() => {
    async function getTokens() {
      await fetch(
        `http://79.143.31.216/statistics?order=${sortBy}&offset=${nextP}&limit=${USERS_LIMIT}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setUsersInfo([...data]);
        });
    }
    getTokens();
  }, [nextP,sortBy]);

  useEffect(() => {
    async function getCounterPage() {
      await fetch(`http://79.143.31.216/statistics?order=asc_short&offset=0`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAllPageUser(data.length);
        });
    }
    getCounterPage();
  }, []);

  const send = () => {
    const linkValue = encodeURIComponent(link);
    async function sendLink() {
      await fetch(`http://79.143.31.216/squeeze?link=${linkValue}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      })
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            console.log("Ссылка отправлена");
            return res;
          } else {
            let error = new Error(res.statusText);
            error.response = res;
            throw error;
          }
        })
        .then((res) => res.json())
        .then((data) => console.log("+", data))
        .then(() => console.log("Ссылка отправлена"))
        .catch((e) => {
          console.log("Error: " + e.message);
          console.log(e.response);
        });
    }
    sendLink();
    setlink("");
  };

const sortByShort = ()=>{
    setSortBy(prev=>{
        if(prev==='asc_short'){
            return 'desc_short'
        }
        else if (prev==='desc_short'){
            return 'asc_short'
        }
        else return 'asc_short'
    })
}

const sortByTarget = ()=>{
    setSortBy(prev=>{
        if(prev==='asc_target'){
            return 'desc_target'
        }
        else if (prev==='desc_target'){
            return 'asc_target'
        }
        else return 'asc_target'
    })
}

const sortByCounter = ()=>{
    setSortBy(prev=>{
        if(prev==='asc_counter'){
            return 'desc_counter'
        }
        else if (prev==='desc_counter'){
            return 'asc_counter'
        }
        else return 'asc_counter'
    })
}


  return (
    <TableBlock>
      <TableUser>
        <TableTd>
          <TableTdInfo onClick={sortByShort}>Короткая ссылка</TableTdInfo>
          {usersInfo.map((user) => (
            <TableTdInfo>
              <a href={`http://79.143.31.216/s/${user?.short}`}>
                {user?.short}
              </a>
            </TableTdInfo>
          ))}
        </TableTd>
        <TableTd>
          <TableTdInfo onClick={sortByTarget}>Полная ссылка</TableTdInfo>
          {usersInfo.map((user) => (
            <TableTdInfo>
              <a href={user?.target}>{user?.target}</a>
            </TableTdInfo>
          ))}
        </TableTd>
        <TableTd>
          <TableTdInfo onClick={sortByCounter}>Счетчик переходов</TableTdInfo>
          {usersInfo.map((user) => (
            <TableTdInfo>{user?.counter}</TableTdInfo>
          ))}
        </TableTd>
        {arrayPage.map((page) => (
          <Pagination
            key={page}
            onClick={() => changePage(page)}
            style={{ color: page === currentPage ? "red" : "black" }}
          >
            {page}
          </Pagination>
        ))}
      </TableUser>
      <InputLink value={link} onChange={(e) => setlink(e.target.value)} />
      <input type="button" value="Создать" onClick={send} />
    </TableBlock>
  );
};

export default TableUs;
