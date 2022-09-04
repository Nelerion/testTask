import styled from "styled-components";
import { useEffect, useRef } from "react";
import { useState } from "react";

import { TbCopy } from "react-icons/tb";
import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";

import { SnackbarProvider, VariantType, useSnackbar } from "notistack";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCellMui from "@mui/material/TableCell";
import TableRowMui from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

const TableRow = styled(TableRowMui)`
  background-color: #f0f1fc;
  -webkit-box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.08);
  -moz-box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.08);
  box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.08);
`;

const TableRowHeader = styled(TableRow)`
  background-color: #b1b1b1;
  cursor: pointer;
`;

const TableCellHeader = styled(TableCellMui)`
  text-align: center !important;
  cursor: pointer;
  &:hover {
    background-color: #c7bfbf;
    transition: all 200ms;
  }
`;

const TableCell = styled(TableCellMui)`
  text-align: center !important;
`;

const TableCellTarget = styled(TableCell)`
  max-width: 500px;
  min-width: 500px;
  width: 500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TableBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0 20px 0;
`;

const FormLink = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 25px;
`;

const CopyButton = styled(TbCopy)`
  margin-left: 5px;
  cursor: pointer;
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
  const [lastCopiedText, setLastCopiedText] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  for (let i = 0; i < allPage; i++) {
    arrayPage.push(i);
  }

  const changePage = (page) => {
    setCurrentPage(page);
    setNextP(page * USERS_LIMIT);
  };

  async function getDataUsers() {
    setIsLoad((prev) => !prev);
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
        setIsLoad((prev) => !prev);
      });
  }

  useEffect(() => {
    getDataUsers();
  }, [nextP, sortBy]);

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
  useEffect(() => {
    getCounterPage();
  }, []);

  const snackSendLink = (variant) => {
    enqueueSnackbar("Ссылка создана", { variant });
  };

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
    getDataUsers();
    getCounterPage();
    snackSendLink("success");
  };

  const sortByShort = () => {
    setSortBy((prev) => {
      if (prev === "asc_short") {
        return "desc_short";
      } else if (prev === "desc_short") {
        return "asc_short";
      } else return "asc_short";
    });
  };

  const sortByTarget = () => {
    setSortBy((prev) => {
      if (prev === "asc_target") {
        return "desc_target";
      } else if (prev === "desc_target") {
        return "asc_target";
      } else return "asc_target";
    });
  };

  const sortByCounter = () => {
    setSortBy((prev) => {
      if (prev === "asc_counter") {
        return "desc_counter";
      } else if (prev === "desc_counter") {
        return "asc_counter";
      } else return "asc_counter";
    });
  };
  const { enqueueSnackbar } = useSnackbar();

  const snackCopyText = () => {
    enqueueSnackbar("Ссылка скопирована");
  };

  const copyLink = (link) => {
    setLastCopiedText(`http://79.143.31.216/s/${link}`);
    snackCopyText();
    navigator.clipboard.writeText(`http://79.143.31.216/s/${link}`);
  };

  return (
    <TableBlock>
      <Table>
        <TableHead>
          <TableRowHeader>
            <TableCellHeader onClick={sortByShort}>
              Короткая ссылка
              {sortBy === "asc_short" && <AiOutlineArrowDown size={20} />}
              {sortBy === "desc_short" && <AiOutlineArrowUp size={20} />}
            </TableCellHeader>
            <TableCellHeader onClick={sortByTarget}>
              {sortBy === "asc_target" && <AiOutlineArrowDown size={20} />}
              {sortBy === "desc_target" && <AiOutlineArrowUp size={20} />}
              Полная ссылка
            </TableCellHeader>
            <TableCellHeader onClick={sortByCounter}>
              {sortBy === "asc_counter" && <AiOutlineArrowDown size={20} />}
              {sortBy === "desc_counter" && <AiOutlineArrowUp size={20} />}
              Количество переходов
            </TableCellHeader>
          </TableRowHeader>
        </TableHead>
        <TableBody>
          {usersInfo.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                {isLoad ? (
                  "Загрузка"
                ) : (
                  <a href={`http://79.143.31.216/s/${user.short}`}>
                    {user.short}
                  </a>
                )}
                <CopyButton size={20} onClick={() => copyLink(user.short)}>
                  Copy
                </CopyButton>
              </TableCell>
              <TableCellTarget>
                {isLoad ? "Загрузка" : <a href={user.target}>{user.target}</a>}
              </TableCellTarget>
              <TableCell>{isLoad ? "Загрузка" : user.counter}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[]}
              colSpan={3}
              count={allPageUser}
              rowsPerPage={USERS_LIMIT}
              page={currentPage}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={(e, page) => changePage(page)}
            />
          </TableRow>
        </TableFooter>
      </Table>

      <FormLink>
        <TextField
          label="ссылка"
          variant="standard"
          value={link}
          onChange={(e) => setlink(e.target.value)}
        />
        <Button variant="contained" onClick={send}>
          Создать ссылку
        </Button>
      </FormLink>
    </TableBlock>
  );
};

export default TableUs;
