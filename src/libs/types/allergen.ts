export type AllergenContaminationStatus = "NotContains" | "Contamination" | "Contains";

export type AllergensList = {
    ebi: AllergenContaminationStatus;
    kani: AllergenContaminationStatus;
    komugi: AllergenContaminationStatus;
    kurumi: AllergenContaminationStatus;
    milk: AllergenContaminationStatus;
    peanut: AllergenContaminationStatus;
    soba: AllergenContaminationStatus;
    tamago: AllergenContaminationStatus;
};
