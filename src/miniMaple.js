class InvalidArgumentException extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidArgumentException';
    }
}

export class MiniMaple{
    _polynom = undefined
    _variable = undefined
    _diffed_polynom = undefined
    constructor(polynom, variable = "x"){
        if(MiniMaple._check_polynom(polynom) === undefined || 
        MiniMaple._check_variable(variable) === undefined){
                throw new InvalidArgumentException("invalid arguments");
        }
        this._polynom = polynom
        this._variable = variable
        this._diffed_polynom = undefined
    }

    static _check_polynom(polynom){
        if(typeof polynom !== 'string') return undefined
        if(polynom.length < 1) return undefined
        for (let i of polynom) {
            if(!"AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz+-*^0123456789".includes(i)) return undefined
        }
        const dropreg = /([a-zA-Z]\d)|(\d[a-zA-Z])|([a-zA-Z]{2,})/g
        if(dropreg.test(polynom)) return undefined
        const regexp = /((-?\d+\*)?-?[a-zA-Z](\^\d+)?)|(-?\d+)/g
        const parts = polynom.match(regexp)
        const pluses = (polynom.match(/\+/g) || []).length
        if(("".concat(parts).replaceAll(",", "")).length + pluses !== polynom.length) return undefined
        return true
    }

    static _check_variable(variable){
        if(typeof variable !== 'string') return undefined
        if(variable.length !== 1) return undefined
        if(!"AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz".includes(variable)) return undefined
        return true
    }

    diff(){
        if(this._diffed_polynom !== undefined){
            return this._diffed_polynom
        }
        // differencing
        const regexp = /((-?\d+\*)?-?[a-zA-Z](\^\d+)?)|(-?\d+)/g
        const parts = this._polynom.match(regexp)
        let result = ""
        for(let part of parts){
            let { cnst, coef, variable, power } = /^(((?<coef>-?\d+)\*)?(?<variable>-?[a-zA-Z])?(\^(?<power>\d+))?)|(?<cnst>-?\d+)$/.exec(part).groups;
            if(variable === undefined) continue
            let minus = (variable[0] === '-')
            variable = variable.replace("-", "")            
            if(variable !== this._variable) continue
            if(coef === undefined) coef = "1"
            else if(coef == 0) continue
            if(power === undefined) power = "1"
            if(power == 0) continue
            minus ^= (coef[0] === '-')
            coef = coef.replace("-", "")

            coef *= power
            power--

            if(result.length != 0 && !minus) result += "+"
            if(minus) result += "-"
            result += coef

            if(power != 0){
                result += "*" + variable + (power != 1 ? "^" + power : "")
            }            
        }
        if(result.length === 0) return "0"
        else return this._diffed_polynom = result
    }
}