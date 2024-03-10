import { FC } from 'react'
import JournalSubject from './UI/journalsubject/JournalSubject'
import classes from '../styles/journal.module.css'
import AdminButton from './UI/button/AdminButton'


const JournalForm: FC = () => {

    return (
        <main style={{ display: 'flex', backgroundColor: 'white', maxHeight: '90svh', color: '#1B0E17', boxSizing: 'border-box' }}>
            <div style={{ width: '200px', display: 'flex', flexDirection: 'column', border: '2px solid #490514', margin: '5px', padding: '10px', backgroundColor: '#F7F3F3', borderRadius: '5px' }}>
                <div style={{ alignSelf: 'start', fontSize: '22px', fontWeight: '600', margin: '5px' }}>Журнал</div>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 0px 5px 0px', borderLeft: '2px solid #8C2425', borderRadius: '5px', padding: '2px 5px', backgroundColor: '#F0EAE9', width: '100%' }}>
                    <div style={{ width: '120px', alignSelf: 'start', fontSize: '20px', fontWeight: '600', margin: '5px' }}>Фильтр</div>
                    <div><input type='checkbox'></input> Посещаемость </div>
                    <div><input type='checkbox'></input> Оценки</div>



                </div>
            </div>
            <div style={{
                width: '85%', border: '2px solid #490514', margin: '5px', overflowX: 'hidden', overflowY: 'auto', whiteSpace: 'nowrap',
                backgroundColor: '#F7F3F3', borderRadius: '5px', scrollbarColor: "#490514", position: 'relative', padding: '5px'
            }}>
                <div style={{ marginLeft: '23.1em', overflowX: 'scroll', overflowY: 'visible', whiteSpace:'nowrap'}}>
                    <table className={classes.JournalTable}>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn} style={{textAlign:'center', fontSize:'20px'}}>№</th>
                            <td className={classes.NameColumn}>ФБР</td>
                            <td className={classes.TableColumn}>Дата 1</td>
                            <td className={classes.TableColumn}>Дата 1</td>
                            <td className={classes.TableColumn}>Дата 1</td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <th className={classes.FirstColumn}>11</th>
                            <td className={classes.NameColumn}>Длинная-фамилия Длинное-имя Длинное-отчество</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                            <td className={classes.TableColumn}>111111111111111111111111111111111111111111111111111111</td>
                        </tr>
                    </table>
                </div>


            </div>
        </main>

    )
}

export default JournalForm