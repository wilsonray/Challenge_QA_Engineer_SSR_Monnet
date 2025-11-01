interface AbilityDetails {
    ability: {
        name: string;
    };
}

export function parseAbilities(abilitiesList: AbilityDetails[]): string[] {
    return abilitiesList.map(abilityDetails => abilityDetails.ability.name);
}