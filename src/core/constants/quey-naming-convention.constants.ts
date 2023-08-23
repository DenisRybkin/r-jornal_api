export enum QueryNamingConventionConstants {
  Equal = 'eq', // for strings & number // example ?name.equal=John
  NotEqual = 'ne', // for strings & numbers // example ?name.notEqual=John
  Like = 'like', // for strings // example ?name.like=John
  NotLike = 'notLike', // for strings // example?name.nLike=John
  GreaterThan = 'gt', // for numbers // example?age.greaterThan=18
  GreaterThanOrEqual = 'gte', // for numbers // example?age.greaterThanOrEqual=18
  LessThan = 'lt', // for numbers // example?age.lessThan=40
  LessThanOrEqual = 'lte' // for numbers // example?age.lessThanOrEqual=40
}
