import uuidv4 from "./UUID";

class Data {

    static #firebase;
    static #ready;
    static #accounts;
    static setFirebase(firebase_) {
        this.firebase = firebase_;
        this.ready = true;
        const accounts = {};
        firebase_.firestore().collection('accounts').get().then(results => {
            results.forEach(element => {
                const account = element.data();
                const id = uuidv4();
                account.name = account?.firstname + " " + account?.lastname;
                account.id = id;
                accounts[id] = account;
            });
      
        });
    }   

    static getAllAccounts() {
        if (!this.ready) return null;
        return this.firebase.firestore().collection('accounts').get();
    }

    static makeUserDataObject() {
        if (!this.ready) return null;
        const accounts = this.getAllAccounts();
    }
    static getUserData(id) {
        if (!this.ready) return null;
        return this.firebase.firestore().collection
    }
    static getPunchesBetween(id, time1, time2) {
        return this.get
    }
    static getHoursWorkedInPeriod(id) {
        if (!this.ready) return null;
        return this.getPunches

    }
    static #periods = [1642406400000, 1643616000000, 1644825600000, 1646035200000, 1647241200000, 1648450800000, 1649660400000, 1650870000000, 1652079600000, 1653289200000, 1654498800000, 1655708400000, 1656918000000, 1658127600000, 1659337200000, 1660546800000, 1661756400000, 1662966000000, 1664175600000, 1665385200000, 1666594800000, 1667808000000, 1669017600000, 1670227200000, 1671436800000, 1672646400000, 1673856000000, 1675065600000, 1676275200000, 1677484800000, 1678690800000, 1679900400000, 1681110000000, 1682319600000, 1683529200000, 1684738800000, 1685948400000, 1687158000000, 1688367600000, 1689577200000, 1690786800000, 1691996400000, 1693206000000, 1694415600000, 1695625200000, 1696834800000, 1698044400000, 1699257600000, 1700467200000, 1701676800000, 1702886400000, 1704096000000, 1705305600000, 1706515200000, 1707724800000, 1708934400000, 1710140400000, 1711350000000, 1712559600000, 1713769200000, 1714978800000, 1716188400000, 1717398000000, 1718607600000, 1719817200000, 1721026800000, 1722236400000, 1723446000000, 1724655600000, 1725865200000, 1727074800000, 1728284400000, 1729494000000, 1730707200000, 1731916800000, 1733126400000, 1734336000000, 1735545600000, 1736755200000, 1737964800000, 1739174400000, 1740384000000, 1741590000000, 1742799600000, 1744009200000, 1745218800000, 1746428400000, 1747638000000, 1748847600000, 1750057200000, 1751266800000, 1752476400000, 1753686000000, 1754895600000, 1756105200000, 1757314800000, 1758524400000, 1759734000000, 1760943600000, 1762156800000 ]
    static getCurrentPeriods(numPeriods=0) {
        // 1641196800000 = Mon Jan 03 2022 00:00:00 GMT-0800 (Pacific Standard Time)
        const START_TIME = new Date(1641196800000);
        const TWO_WEEKS = 1209600000
        let now = Date.now();
        let periodsSince = Math.floor((now - START_TIME) / TWO_WEEKS);
        let periodDataList = [];
        console.log(this.#periods);
        for (let i = periodsSince - 1; i >= periodsSince - numPeriods; i--) {
            periodDataList.push({
                start: this.#periods[i],
                end: this.#periods[i+1] || 0,
                time: 1,
                startDate: new Date(this.#periods[i]).toLocaleString().replace(/^(\d+)\/(\d+)\/(\d+).+/g, '$1-$2-$3'),
                overtime: Math.floor(Math.random() * 3),
            })
        }
        return periodDataList;
    }
}

export default Data;