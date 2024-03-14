import { FC } from 'react'
import JournalSubject from './UI/journalsubject/JournalSubject'
import classes from '../styles/journal.module.css'
import AdminButton from './UI/button/AdminButton'


const JournalForm: FC = () => {

    return (
        <main className={classes.Main}>
            <div className={classes.NavigationBox}>
                <div className={classes.Header}>Журнал</div>
                <div className={classes.FilterBox}>
                <div className={classes.FilterBoxLabel}>Фильтр:</div>
                    <div><input type='checkbox' className={classes.CheckBox}></input> Посещаемость </div>
                    <div><input type='checkbox' className={classes.CheckBox}></input> Оценки</div>

                </div>
            </div>
            <div className={classes.TableBox}>
                <div style={{ marginLeft: '23.1em', overflowX: 'scroll', overflowY: 'visible', whiteSpace:'nowrap'}}>
                    <table className={classes.JournalTable}>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn} style={{textAlign:'center', fontSize:'20px'}}>№</th>
                            <td className={classes.NameColumn}>ФБР</td>
                            <td className={classes.TableColumn}>Дата 1</td>
                            <td className={classes.TableColumn}>Дата 1</td>
                            <td className={classes.TableColumn}>Дата 1</td>
                            <td className={classes.TableColumn}><button style={{width:'40px'}}>+</button></td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}></td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}></td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}></td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}></td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}></td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}></td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}></td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}></td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}></td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}></td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}></td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}></td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}></td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}></td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}></td>
                        </tr>
                    </table>
                </div>

            </div>
        </main>
    )
}

export default JournalForm