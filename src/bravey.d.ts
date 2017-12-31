export interface IntentEntity {
   entity: string;
   id: string;
}

export interface Entity<T = any> {
   entity: string;
   string: string;
   position: number;
   value: T;
   priority: number;
}

/* nlp core */

export type Stemmer = (word: string) => string;
export type Filter = (tokens: string[]) => string[];

export interface NlpResult {
   entities: Entity[];
   entitiesIndex:	{ [key: string]: any };
   intent: string;
   score: number;
}

declare class NlpCore {
   constructor(nlpName: string, extensions?: {
      filter: Filter;
      stemmer: Stemmer;
   });
   addDocument(text: string, intent: string, guess?: {
      fromFullSentence?: boolean;   
      fromTaggedSentence?: boolean;
      expandIntent?: boolean;
      withNames?: string[];
   }): boolean;
   addEntity(entity: EntityRecognizer): boolean;
   addIntent(intentName: string, entities: IntentEntity[]): boolean;
   getConfidence(): number;
   hasEntity(entityName: string): boolean;
   setConfidence(ratio: number): void;
   test(text: string, method?: "default"|"anyEntity"): NlpResult|false;
}

declare class Sequential extends NlpCore {
   constructor();
}

declare class Fuzzy extends NlpCore {
   constructor();
}

export declare const Nlp: {   
   Fuzzy: typeof Fuzzy;
   Sequential: typeof Sequential;
};

/* recognizers */

export type DateStamp = string;
export type TimeStamp = string;

declare class EntityRecognizer<T = any> {
   getEntities(string: string, out?: Entity[]): Entity<T>[];
   getName(): string;
}

type regexEntityRecognizerCallback = (match: string[]) => Entity|undefined;

export declare class RegexEntityRecognizer<T = any> extends EntityRecognizer<T> {
   constructor(entityName: string);
   addMatch(regex: RegExp, callback: regexEntityRecognizerCallback, priority?: number): boolean;
}

export declare class StringEntityRecognizer extends EntityRecognizer<string> {
   constructor(entityName: string, priority?: number);
   addMatch(entityId: string, entityText: string): boolean;
}

export declare class EmailEntityRecognizer extends EntityRecognizer<string> {
   constructor(entityName: string, priority?: number);   
}

declare class DateEntityRecognizer extends EntityRecognizer<DateStamp> {
   constructor(entityName: string);
}

declare class NumberEntityRecognizer extends EntityRecognizer<number> {
   constructor(entityName: string);
}

declare class FreeTextEntityRecognizer extends EntityRecognizer<string> {
   constructor(entityName: string);
}

declare class TimeEntityRecognizer extends EntityRecognizer<TimeStamp> {
   constructor(entityName: string);
}

interface Range<T> {
   start: T;
   end: T;   
}

declare class TimePeriodEntityRecognizer extends EntityRecognizer<Range<TimeStamp>> {
   constructor(entityName: string);
}

/* languages */

export declare const Language: Language;

declare interface Language_EN {
   DateEntityRecognizer: typeof DateEntityRecognizer;
   FreeTextEntityRecognizer: typeof FreeTextEntityRecognizer;
   NumberEntityRecognizer: typeof NumberEntityRecognizer;
   Stemmer: Stemmer;
   TimeEntityRecognizer: typeof TimeEntityRecognizer;
   TimePeriodEntityRecognizer: typeof TimePeriodEntityRecognizer;
}

declare interface Language_IT {
   DateEntityRecognizer: typeof DateEntityRecognizer;
   FreeTextEntityRecognizer: typeof FreeTextEntityRecognizer;
   NumberEntityRecognizer: typeof NumberEntityRecognizer;
   Stemmer: Stemmer;
   TimeEntityRecognizer: typeof TimeEntityRecognizer;
   TimePeriodEntityRecognizer: typeof TimePeriodEntityRecognizer;
}

declare interface Language_PT {
   DateEntityRecognizer: typeof DateEntityRecognizer;
   FreeTextEntityRecognizer: typeof FreeTextEntityRecognizer;
   NumberEntityRecognizer: typeof NumberEntityRecognizer;
   Stemmer: Stemmer;
   TimeEntityRecognizer: typeof TimeEntityRecognizer;
   TimePeriodEntityRecognizer: typeof TimePeriodEntityRecognizer;
}

export interface Language {
   IT: Language_IT;
   EN: Language_EN;
   PT: Language_PT;
}
