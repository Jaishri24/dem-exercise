export class DecisionModel{
    public businessDetails: BusinessDetails;
    public preAssessment: number = 20;
}

export class BusinessDetails{
    public name: string;
    public yearEstablished: number;
    public profitLossSummary: any[];
}