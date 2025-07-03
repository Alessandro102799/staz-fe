export default function calculateStake(quota: number, initialBudget: number) {
    if(initialBudget) {
        let stakePercentage: number = 0;
        const baseAmount: number = initialBudget;
    
        const quotaValue = quota;
    
        if (isNaN(quotaValue)) {
            return {
            stake: stakePercentage,
            amount: 0,
            possibleWin: 0,
            };
        }
        
        if (quotaValue >= 1.0 && quotaValue <= 1.85) {
            stakePercentage = 11;
        } else if (quotaValue > 1.85 && quotaValue <= 2.2) {
            stakePercentage = 10;
        } else if (quotaValue > 2.2 && quotaValue <= 3.2) {
            stakePercentage = 8;
        } else if (quotaValue > 3.2 && quotaValue <= 4.2) {
            stakePercentage = 6;
        } else if (quotaValue > 4.3 && quotaValue <= 7.2) {
            stakePercentage = 2;
        } else {
            stakePercentage = 1;
        }
    
        const amount = (baseAmount * stakePercentage) / 100;
        const possibleWin = quotaValue * amount;
    
        return {
            stake: stakePercentage,
            amount: amount,
            possibleWin: possibleWin,
        };
    }
}
